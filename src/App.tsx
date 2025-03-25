import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Github, Linkedin, Mail, Sparkles, Gift, Stars, Moon, Cloud } from "lucide-react";

const message = "SORRY";
const fullMessage = "Please Forgive Me 💝";



const realFlowerImages = [
  "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1496857239036-1fb137683000?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1518895312237-a9e23508077d?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=300"
];

export default function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const controls = useAnimation();
  const ribbonControls = useAnimation();
  const glowControls = useAnimation();
  const moonControls = useAnimation();
  const backgroundControls = useAnimation();

  useEffect(() => {
    glowControls.start({
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, []);

  const handleGiftClick = async () => {
    ribbonControls.start({
      scaleY: [1, 0],
      transition: { duration: 0.3 }
    });

    await controls.start({
      scale: [1, 1.2, 1.1],
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.7 }
    });

    backgroundControls.start({
      opacity: 1,
      transition: { duration: 1.5 }
    });

    moonControls.start({
      y: [-100, 0],
      opacity: [0, 1],
      transition: { duration: 1.5, ease: "easeOut" }
    });

    controls.start({
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    });

    setIsGiftOpened(true);
    setTimeout(() => setShowFullMessage(true), 1500);
  };

  const RealFlower = ({ image, index, total }: { image: string; index: number; total: number }) => {
    // Calculate position along the bottom arc
    const angle = (index / (total - 1)) * 180; // 180 degrees for bottom half
    const radius = window.innerHeight * 0.4; // Responsive radius
    const centerX = window.innerWidth / 2;
    const bottomY = window.innerHeight - 100; // 100px from bottom
    
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = bottomY + radius * Math.sin((angle * Math.PI) / 180) * 0.3; // Flattened arc

    return (
      <motion.div
        initial={{ x, y, opacity: 0, scale: 0 }}
        animate={{
          x: [x - 10, x + 10],
          y: [y - 5, y + 5],
          opacity: 1,
          scale: 1,
          rotate: [-5, 5]
        }}
        transition={{
          duration: 4,
          delay: index * 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute left-0 top-0"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <motion.div
            className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <img
            src={image}
            alt="Rose"
            className="w-32 h-32 rounded-full object-cover shadow-[0_0_30px_rgba(255,192,203,0.3)] border-2 border-white/30 relative z-10"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </motion.div>
    );
  };

  const Star = ({ delay = 0, size = 2 }: { delay?: number; size?: number }) => (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        width: size,
        height: size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
    />
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500"
        initial={{ opacity: 1 }}
        animate={{ opacity: isGiftOpened ? 0 : 1 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80')] bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={backgroundControls}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        {Array.from({ length: 200 }).map((_, i) => (
          <Star key={i} delay={Math.random() * 5} size={Math.random() * 2 + 1} />
        ))}
      </motion.div>

      <main className="flex-grow flex flex-col justify-center items-center text-center p-4 relative overflow-hidden">
        {isGiftOpened && (
          <motion.div
            animate={moonControls}
            className="absolute top-8 right-8 text-yellow-200"
            initial={{ opacity: 0, y: -100 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-yellow-100 rounded-full blur-[100px] opacity-30 scale-[2.5]" />
              <div className="absolute inset-0 bg-yellow-200 rounded-full blur-3xl opacity-40 scale-[2]" />
              <div className="absolute inset-0 bg-yellow-100 rounded-full blur-2xl opacity-50 scale-[1.5]" />
              <Moon className="relative w-40 h-40 drop-shadow-[0_0_60px_rgba(253,224,71,0.8)]" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-transparent opacity-40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-100 to-transparent opacity-20 rounded-full transform rotate-45" />
            </motion.div>
          </motion.div>
        )}

        {isGiftOpened && Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-1 bg-white"
            style={{
              top: `${Math.random() * 50}%`,
              left: '100%'
            }}
            animate={{
              x: [0, -window.innerWidth * 1.5],
              y: [0, window.innerWidth * 0.2],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-white blur-sm transform scale-x-[20]" />
          </motion.div>
        ))}

        {isGiftOpened && Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute text-white/10"
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: [window.innerWidth + 100, -100],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              delay: i * 3
            }}
            style={{
              top: `${20 + i * 15}%`,
            }}
          >
            <Cloud className="w-16 h-16" />
          </motion.div>
        ))}

        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              repeatDelay: Math.random() * 2
            }}
          >
            {i % 2 === 0 ? (
              <Sparkles className="w-4 h-4 text-yellow-300" />
            ) : (
              <Stars className="w-4 h-4 text-pink-200" />
            )}
          </motion.div>
        ))}

        {!isGiftOpened ? (
          <motion.div
            initial={{ y: -1000 }}
            animate={{
              y: 0,
              rotate: [0, -360, -720],
              transition: {
                duration: 2,
                ease: "easeOut",
                rotate: { duration: 2.5 }
              }
            }}
            className="cursor-pointer relative"
            onClick={handleGiftClick}
          >
            <motion.div
              animate={glowControls}
              className="absolute inset-0 bg-pink-300 rounded-2xl blur-xl"
            />
            
            <motion.div
              animate={controls}
              className="relative bg-gradient-to-br from-pink-400 to-pink-600 p-8 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform"
            >
              <motion.div
                animate={ribbonControls}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-pink-300 -mt-4"
              />
              <motion.div
                animate={ribbonControls}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-pink-300"
              />
              
              <Gift className="w-24 h-24 text-white drop-shadow-lg" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="mt-4"
              >
                <p className="text-white font-semibold text-lg">Click to Open</p>
                <motion.p
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-pink-200 text-sm mt-1"
                >
                  A special message awaits...
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="space-y-12 relative">
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              {message.split("").map((letter, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, y: 50, opacity: 0 }}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: idx * 0.2,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  className="text-5xl md:text-8xl font-bold text-white drop-shadow-lg"
                >
                  {letter}
                </motion.div>
              ))}
            </div>

            {showFullMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.p
                  className="text-2xl md:text-4xl text-white font-light"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {fullMessage}
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className="inline-block text-red-400 w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(248,113,113,0.7)]"
                    fill="#f87171"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Flowers at the bottom */}
            <div className="absolute bottom-0 left-0 w-full">
              {realFlowerImages.map((image, i) => (
                <RealFlower 
                  key={i} 
                  image={image} 
                  index={i} 
                  total={realFlowerImages.length}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <motion.footer 
        className="w-full bg-black/20 backdrop-blur-md py-6 px-4 mt-auto border-t border-white/20 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Design SKD
            </span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.div>
          
          <div className="flex space-x-6">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "2212061@nec.edu.in" }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-white hover:text-pink-300 transition-colors relative group"
              >
                <item.icon className="w-6 h-6" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.href.replace('mailto:', 'Email')}
                </span>
              </motion.a>
            ))}
          </div>
          
          <motion.div 
            className="text-sm text-white/80"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} Design SKD. All rights reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}