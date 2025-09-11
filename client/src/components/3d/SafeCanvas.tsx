import { Suspense, ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { isWebGLSupported } from '@/lib/webgl-utils';
import WebGLErrorBoundary from './WebGLErrorBoundary.tsx';

interface SafeCanvasProps {
  children: ReactNode;
  fallback?: ReactNode;
  camera?: any;
  gl?: any;
  frameloop?: 'always' | 'demand' | 'never';
  dpr?: number | [number, number];
  style?: React.CSSProperties;
  className?: string;
}

const DefaultFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20">
    {/* Animated CSS background patterns */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/10 rounded-full animate-pulse delay-500"></div>
    </div>
    
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
  </div>
);

const SafeCanvas = ({ 
  children, 
  fallback = <DefaultFallback />, 
  camera = { position: [0, 0, 5], fov: 75 },
  gl = { antialias: false, alpha: true, powerPreference: "low-power" },
  frameloop = "always",
  dpr = [1, 1.5],
  style,
  className
}: SafeCanvasProps) => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Check WebGL support on mount
    const checkSupport = async () => {
      try {
        const supported = isWebGLSupported();
        setWebglSupported(supported);
      } catch (e) {
        console.warn('WebGL support check failed:', e);
        setWebglSupported(false);
      }
    };

    checkSupport();
  }, []);

  // Show loading state while checking
  if (webglSupported === null) {
    return <div className={className} style={style}>{fallback}</div>;
  }

  // Show fallback if WebGL not supported
  if (!webglSupported) {
    return <div className={className} style={style}>{fallback}</div>;
  }

  // Render Canvas with error boundary
  return (
    <div className={className} style={style}>
      <WebGLErrorBoundary fallback={fallback}>
        <Canvas
          camera={camera}
          gl={gl}
          frameloop={frameloop}
          dpr={dpr}
          onCreated={({ gl }) => {
            console.log('WebGL Renderer created successfully');
          }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

export default SafeCanvas;