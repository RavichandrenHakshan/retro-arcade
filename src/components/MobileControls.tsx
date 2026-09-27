const MobileControls = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 p-4 rounded-xl border-4 border-gray-800 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500 font-press-start text-[8px] uppercase tracking-widest">
          Virtual Gamepad
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-800 rounded-full text-white font-vt323 text-sm active:bg-gray-700 shadow-[inset_0_-2px_0_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-none">SELECT</button>
          <button className="px-3 py-1 bg-gray-800 rounded-full text-white font-vt323 text-sm active:bg-gray-700 shadow-[inset_0_-2px_0_rgba(0,0,0,0.5)] active:translate-y-[2px] active:shadow-none">START</button>
        </div>
      </div>

      <div className="flex justify-between items-end">
        {/* D-Pad */}
        <div className="relative w-32 h-32">
          {/* Up */}
          <button className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-12 bg-gray-700 rounded-t-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] active:bg-gray-600 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]"></button>
          {/* Down */}
          <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 bg-gray-700 rounded-b-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)] active:bg-gray-600 active:shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5)]"></button>
          {/* Left */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-10 bg-gray-700 rounded-l-lg shadow-[inset_2px_0_4px_rgba(255,255,255,0.1)] active:bg-gray-600 active:shadow-[inset_4px_0_8px_rgba(0,0,0,0.5)]"></button>
          {/* Right */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-10 bg-gray-700 rounded-r-lg shadow-[inset_-2px_0_4px_rgba(0,0,0,0.3)] active:bg-gray-600 active:shadow-[inset_-4px_0_8px_rgba(0,0,0,0.5)]"></button>
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700 z-10">
            <div className="absolute inset-2 bg-gray-800 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4">
          <button className="w-14 h-14 rounded-full bg-red-600 text-red-900 font-press-start text-xs flex items-center justify-center shadow-[inset_-2px_-4px_8px_rgba(0,0,0,0.4),0_4px_6px_rgba(0,0,0,0.5)] active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.4)] active:translate-y-1 active:bg-red-700">
            B
          </button>
          <button className="w-14 h-14 rounded-full bg-red-600 text-red-900 font-press-start text-xs flex items-center justify-center shadow-[inset_-2px_-4px_8px_rgba(0,0,0,0.4),0_4px_6px_rgba(0,0,0,0.5)] active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.4)] active:translate-y-1 active:bg-red-700 -translate-y-6">
            A
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
