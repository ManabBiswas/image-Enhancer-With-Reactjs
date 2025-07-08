import axios from "axios";

// Configuration
const API_KEY = process.env.REACT_APP_API_KEY || "YOUR_API_KEY_HERE";
const BASE_URL = "https://techhk.aoscdn.com";
const MAXIMUM_RETRIES = 30;
const POLL_INTERVAL = 2000; // 2 seconds

// Validate API key
if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
  console.warn("⚠️ API key not configured. Please set REACT_APP_API_KEY environment variable.");
}

/**
 * Main function to enhance an image
 * @param {File} file - The image file to enhance
 * @returns {Promise<Object>} Enhanced image data
 */
export const enhancedImageAPI = async (file) => {
  try {
    // Validate input
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please provide a valid image file.');
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size too large. Please choose an image smaller than 10MB.');
    }

    console.log('📤 Uploading image for enhancement...');
    const taskId = await uploadImage(file);
    
    console.log('⏳ Processing image enhancement...');
    const enhancedImageData = await pollForEnhancedImage(taskId);
    
    console.log('✅ Image enhancement completed');
    return enhancedImageData;
    
  } catch (error) {
    console.error('❌ Error enhancing image:', error);
    throw new Error(error.message || 'Failed to enhance image. Please try again.');
  }
};

/**
 * Upload image to the API
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} Task ID for tracking
 */
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image_file", file);

    const response = await axios.post(
      `${BASE_URL}/api/tasks/visual/scale`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
        timeout: 30000, // 30 seconds timeout
      }
    );

    if (!response.data?.data?.task_id) {
      throw new Error("Upload failed: No task ID received from server");
    }

    return response.data.data.task_id;
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      const status = error.response.status;
      const message = error.response.data?.message || 'Unknown server error';
      
      switch (status) {
        case 401:
          throw new Error('Invalid API key. Please check your configuration.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 413:
          throw new Error('File too large. Please use a smaller image.');
        default:
          throw new Error(`Server error (${status}): ${message}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your internet connection.');
    } else {
      // Other error
      throw new Error(error.message || 'Failed to upload image');
    }
  }
};

/**
 * Poll for enhanced image result
 * @param {string} taskId - Task ID to poll
 * @param {number} retries - Current retry count
 * @returns {Promise<Object>} Enhanced image data
 */
const pollForEnhancedImage = async (taskId, retries = 0) => {
  try {
    const result = await fetchEnhancedImage(taskId);

    // Check if still processing
    if (result.state === 4) {
      if (retries >= MAXIMUM_RETRIES) {
        throw new Error('Processing timeout. The image is taking too long to enhance. Please try again.');
      }

      console.log(`⏳ Processing... (${retries + 1}/${MAXIMUM_RETRIES})`);
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
      
      return pollForEnhancedImage(taskId, retries + 1);
    }

    // Check if processing failed
    if (result.state === 3) {
      throw new Error('Image processing failed. Please try again with a different image.');
    }

    // Check if completed successfully
    if (result.state === 1 && result.output_url) {
      return {
        output_url: result.output_url,
        task_id: taskId,
        state: result.state,
        processing_time: result.processing_time || 'N/A'
      };
    }

    // Unknown state
    throw new Error(`Unexpected processing state: ${result.state}`);
    
  } catch (error) {
    if (error.message.includes('Processing timeout') || 
        error.message.includes('Unexpected processing state')) {
      throw error;
    }
    
    // Retry on network errors
    if (retries < 3) {
      console.log(`🔄 Retrying fetch... (${retries + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return pollForEnhancedImage(taskId, retries + 1);
    }
    
    throw new Error('Failed to fetch enhanced image. Please try again.');
  }
};

/**
 * Fetch enhanced image status
 * @param {string} taskId - Task ID to check
 * @returns {Promise<Object>} Image processing status
 */
const fetchEnhancedImage = async (taskId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
        timeout: 15000, // 15 seconds timeout
      }
    );

    if (!response.data?.data) {
      throw new Error("Invalid response from server");
    }

    return response.data.data;
  } catch (error) {
       if (error.response?.status === 404) {
      throw new Error('Task not found. Please try again later or re-upload the image.');
    }
    throw new Error(error.message || 'Failed to fetch image enhancement status.');
  }
};