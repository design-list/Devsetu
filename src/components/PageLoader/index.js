// src/components/Loader.js
"use client";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default PageLoader;