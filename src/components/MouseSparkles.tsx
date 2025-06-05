import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Declare global window interface
declare global {
  interface Window {
    setCursorVerify?: () => void;
    setCursorInvalid?: () => void;
    resetCursor?: () => void;
  }
}

interface SparkleProps {
  x: number;
  y: number;
  color: string;
  size: number;
  id: number;
}

interface CursorPosition {
  x: number;
  y: number;
  timestamp: number;
}

type CursorVariant = 'default' | 'verify' | 'invalid';

// Verification theme colors - blues and greens for trust and verification
// const colors = ['#4CAF50', '#2196F3', '#00BCD4', '#009688', '#3F51B5', '#1976D2', '#0D47A1', '#00796B'];
const colors = ['#FFA500', '#FFD700', '#FF8C00', '#FF4500', '#FF6347', '#9C27B0', '#3F51B5', '#2196F3'];

// Cursor variants for different contexts
const cursorVariants = {
  default: {
    opacity: 1,
    height: 12,
    width: 12,
    backgroundColor: '#2196F3',
    transition: {
      type: 'spring',
      mass: 0.6,
    },
  },
  verify: {
    opacity: 1,
    height: 64,
    width: 64,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invalid: {
    opacity: 1,
    height: 64,
    width: 64,
    backgroundColor: '#F44336',
    color: '#fff',
    fontSize: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default function MouseSparkles() {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState('');
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorPositions = useRef<CursorPosition[]>([]);
  
  // Smoother spring animation for cursor
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  // Track cursor positions for path tracing
  const addCursorPosition = (x: number, y: number) => {
    const now = Date.now();
    cursorPositions.current.push({ x, y, timestamp: now });
    
    // Keep only positions from the last 5 seconds
    cursorPositions.current = cursorPositions.current.filter(
      pos => now - pos.timestamp < 5000
    );
  };

  // Functions to change cursor state - can be called from other components
  const setCursorVerify = () => {
    setCursorText('✓');
    setCursorVariant('verify');
  };

  const setCursorInvalid = () => {
    setCursorText('✗');
    setCursorVariant('invalid');
  };

  const resetCursor = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      addCursorPosition(e.clientX, e.clientY);
      
      // Create sparkles with verification theme
      if (Math.random() > 0.3) {
        // Get a position from the recent cursor path
        let position = { x: e.clientX, y: e.clientY };
        
        // More often use a previous position from the path to create trailing effect
        if (cursorPositions.current.length > 5 && Math.random() > 0.3) {
          // Use positions further back in the history for longer trails
          const randomIndex = Math.floor(Math.random() * Math.min(20, cursorPositions.current.length));
          const pastPosition = cursorPositions.current[cursorPositions.current.length - 1 - randomIndex];
          position = { x: pastPosition.x, y: pastPosition.y };
        }
        
        // Create sparkles with verification theme colors
        const newSparkle: SparkleProps = {
          x: position.x,
          y: position.y,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 15 + 15,
          id: Date.now()
        };
        
        setSparkles(prev => [...prev, newSparkle]);
        
        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
        }, 3500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Expose cursor control functions to window for global access
  useEffect(() => {
    window.setCursorVerify = setCursorVerify;
    window.setCursorInvalid = setCursorInvalid;
    window.resetCursor = resetCursor;
    
    return () => {
      // Clean up when component unmounts
      delete window.setCursorVerify;
      delete window.setCursorInvalid;
      delete window.resetCursor;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Main cursor effect with variant-based styling */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 50
        }}
      >
        {cursorText}
      </motion.div>
      
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            zIndex: 40,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{
            opacity: [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
            scale: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0],
          }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}