import React from 'react'

const FR_BLUE = '#0b3d91'

// variant: 'default' | 'glass' | 'accent'
// reveal: '' | 'left' | 'right' | 'fade' | 'up'
// intensity: 'normal' | 'strong'
const FeatureCard = ({ icon: Icon, title, description, className = '', variant = 'default', reveal = '', intensity = 'normal', darkMode = false }) => {
  const variantClasses = {
    default: darkMode ? 'bg-[#0c0c0c] text-gray-100 border border-gray-800' : 'bg-white text-[#001A3D] border border-gray-100',
    glass: darkMode ? 'bg-white/5 backdrop-blur-md text-gray-100 border border-gray-800' : 'bg-white/6 backdrop-blur-md text-[#001A3D] border border-gray-100',
    accent: darkMode ? 'bg-[#0a0a0a] text-white border border-gray-800' : 'bg-white text-white',
  };

  const revealClass = reveal === 'left' ? 'slide-left' : reveal === 'right' ? 'slide-right' : reveal === 'up' ? 'reveal' : 'reveal';

  return (
    <div
      className={`p-8 rounded-3xl ${variantClasses[variant] || variantClasses.default} hover:shadow-xl transition-all duration-500 group relative overflow-hidden border-l-4 ${revealClass} ${className}`}
      style={{ borderLeftColor: FR_BLUE }}
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        {Icon ? <Icon className={`w-24 h-24 ${darkMode ? 'text-gray-500' : 'text-[#001A3D]'}`} /> : null}
      </div>

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 relative z-10 ${darkMode ? 'bg-[#141414] group-hover:bg-blue-700' : 'bg-gray-50 group-hover:bg-[#0b3d91]'}`}>
        {Icon ? <Icon className={`${darkMode ? 'text-gray-200 group-hover:text-white' : 'text-[#001A3D] group-hover:text-white'} w-6 h-6 transition-colors duration-300`} /> : null}
      </div>

      <h3 className={`text-xl font-bold mb-3 tracking-tight relative z-10 ${darkMode ? 'text-white' : 'text-[#001A3D]'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed font-medium relative z-10 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
    </div>
  )
}

export default FeatureCard