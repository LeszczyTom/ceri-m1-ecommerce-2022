import {React, useEffect} from 'react';
import './details.css';

const Animation = () => {
  useEffect(() => {
    const html = document.documentElement;
    const c = document.getElementById('myCanvas');
    const ctx = c.getContext('2d');
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();

    /*https://raw.githubusercontent.com/YasserAtmani/anim_react_ecommerce/main/anim_v3/0000.png*/
    const frameCount = 148;

    const currentFrame = index => (
      `https://raw.githubusercontent.com/YasserAtmani/anim_react_ecommerce/main/anim_v3/${index.toString().padStart(4, '0')}.png`
    )

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const img = new Image();
    img.src = currentFrame(1);
    c.width = 1000;
    c.height = 1000;
    img.onload = function () {
      ctx.drawImage(img, 0, 0,);
    };

    const updateImage = (index) => {
      img.src = currentFrame(index);
      ctx.drawImage(img, 0, 0);
    };

    window.addEventListener('scroll', () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

    preloadImages();
  }, []);

  return (
    <div>
      <div className="canvasContainer">
        <canvas id="myCanvas">
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
    </div>
  );
};

export default Animation;