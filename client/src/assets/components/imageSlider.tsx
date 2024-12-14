import { useState } from "react"

export function ImageSlider() {
    const images = [
        "https://apollo.olx.in/v1/files/qyb5whn9aqb2-IN/image;s=780x0;q=60",
        "https://apollo.olx.in/v1/files/vigo10jw9lh33-IN/image;s=780x0;q=60",
        "https://apollo.olx.in/v1/files/2okw8eit1b681-IN/image;s=780x0;q=60",
        "https://apollo.olx.in/v1/files/90uz5rl0rh5f1-IN/image;s=780x0;q=60",
    ];
    const [currentIndex, setCurrentIndex] = useState(0)
    const next = () => {
        if (currentIndex < images.length-1) {
            setCurrentIndex((prev) => prev + 1);
        }
    }
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }

    return (
        <div className=" bg-black rounded-lg min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]  flex justify-center relative ">
            {images.map((image, index) => {
                if (index == currentIndex) {
                    return <img className="  max-h-[calc(100vh-4rem)]  px-12 " key={index} src={image}></img>
                }
                
            })}

<button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900"
        onClick={prev}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900"
        onClick={next}
      >
        ❯
      </button>
            
      
        </div>

    )
}