// WebGL utility functions for graceful fallback handling

export const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

export const isWebGL2Supported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    return !!gl;
  } catch (e) {
    return false;
  }
};

// Check if device has sufficient GPU capabilities
export const getWebGLCapabilities = () => {
  if (!isWebGLSupported()) {
    return { supported: false, reason: 'WebGL not supported' };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    
    if (!gl) {
      return { supported: false, reason: 'WebGL context creation failed' };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    
    return {
      supported: true,
      renderer,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
    };
  } catch (e: any) {
    return { supported: false, reason: `WebGL error: ${e?.message || e}` };
  }
};