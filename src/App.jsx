import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [bgFile, setBgFile] = useState(null);
  const [bgFileType, setBgFileType] = useState(null);
  const [fontSize, setFontSize] = useState(30);

  // Store font color for each unit
  const [fontColors, setFontColors] = useState({
    all: "#000000", 
    days: "#000000",
    hours: "#000000",
    minutes: "#000000",
    seconds: "#000000",
  });

  const [fileName, setFileName] = useState("Upload");
  const [selectedTarget, setSelectedTarget] = useState("all");

  // Store animation effect
  const [animation, setAnimation] = useState('none'); // Default is no animation

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(targetDate);
      const calDiff = targetTime - currentTime;

      if (calDiff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(calDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((calDiff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((calDiff / (1000 * 60)) % 60),
          seconds: Math.floor((calDiff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleBgRequest = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);  // Create temporary URL for the file
      setBgFile(fileURL);
      setFileName(file.name);

      if (file.type === 'video/mp4') {
        setBgFileType('video');
      } else if (file.type === 'image/png') {
        setBgFileType('image');
      } else {
        alert('Please upload a .mp4 or .png file.');
      }
    }
  };

  // Update font color based on selected target
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setFontColors((prevColors) => ({
      ...prevColors,
      [selectedTarget]: newColor,
    }));
  };

  // Handle animation change
  const handleAnimationChange = (e) => {
    setAnimation(e.target.value);
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'fade-in';
      case 'bounce':
        return 'bounce';
      case 'pulse':
        return 'pulse';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      {/* Set Date */}
      <input 
        type="datetime-local" 
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)} 
      />

      {/* Video or Image Background */}
      {bgFile && (
        <>
          {bgFileType === "video" ? (
            <video
              key={bgFile}
              src={bgFile}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
              }}
              onError={(e) => console.error("Error loading video", e)}
            />
          ) : (
            <img
              src={bgFile}
              alt="Background"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
              }}
            />
          )}
        </>
      )}

      {/* Countdown Display */}
      <div className="time-left" style={{ textAlign: 'center' }}>
        <div className="time-unit">
          <p 
            style={{ 
              fontSize: `${fontSize}px`, 
              color: selectedTarget === "all" ? fontColors.all : fontColors.days 
            }} 
            className={getAnimationClass()}
          >
            {timeLeft.days} :
          </p>
          <span>Days</span>
        </div>
        <div className="time-unit">
          <p 
            style={{ 
              fontSize: `${fontSize}px`, 
              color: selectedTarget === "all" ? fontColors.all : fontColors.hours 
            }} 
            className={getAnimationClass()}
          >
            {timeLeft.hours} :
          </p>
          <span>Hours</span>
        </div>
        <div className="time-unit">
          <p 
            style={{ 
              fontSize: `${fontSize}px`, 
              color: selectedTarget === "all" ? fontColors.all : fontColors.minutes 
            }} 
            className={getAnimationClass()}
          >
            {timeLeft.minutes} :
          </p>
          <span>Minutes</span>
        </div>
        <div className="time-unit">
          <p 
            style={{ 
              fontSize: `${fontSize}px`, 
              color: selectedTarget === "all" ? fontColors.all : fontColors.seconds 
            }} 
            className={getAnimationClass()}
          >
            {timeLeft.seconds}
          </p>
          <span>Seconds</span>
        </div>
      </div>

      {/* Controls Container */}
      <div className="controls-container">
        {/* Upload Background */}
        <input
          type="file"
          accept=".mp4, .png"
          onChange={handleBgRequest}
          id="file-upload"
          className="inputfile" 
          hidden
        />
        <label htmlFor="file-upload" className="upload-btn">
          {fileName === "Upload" ? "Upload" : fileName}
        </label>

        {/* Choose Font Size */}
        <div>
          <label>Font Size: </label>
          <input
            type="number"
            min="10"
            max="400"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)} 
          />
        </div>

        {/* Specific Choosing */}
        <div>
          <label htmlFor="styleTarget">Style Target:</label>
          <select 
            id="styleTarget" 
            value={selectedTarget} 
            onChange={(e) => setSelectedTarget(e.target.value)}
          >
            <option value="all">All</option>
            <option value="days">Days</option>
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
            <option value="seconds">Seconds</option>
          </select>
        </div>

        {/* Choose Font Color */}
        <div>
          <label>Font Color: </label>
          <input
            type="color"
            value={fontColors[selectedTarget]}
            onChange={handleColorChange}
          />
        </div>

        {/* Choose Animation Effect */}
        <div>
          <label>Animation: </label>
          <select value={animation} onChange={handleAnimationChange}>
            <option value="none">None</option>
            <option value="fade">Fade-In</option>
            <option value="bounce">Bounce</option>
            <option value="pulse">Pulse</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
