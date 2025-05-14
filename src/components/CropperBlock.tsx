import React, {ChangeEvent, createRef, DragEvent, useState} from "react";
import Cropper, {ReactCropperElement} from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./CropperBlock.css";

export const CropperBlock: React.FC = () => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const cropperRef = createRef<ReactCropperElement>();

    const onChange = (e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let files: FileList | null = null;
        if (e.type === "change") {
            const target = e.target as HTMLInputElement;
            files = target.files;
        } else if (e.type === "drop") {
            const target = e as DragEvent<HTMLDivElement>;
            files = target.dataTransfer?.files || null;
        }

        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const getCropData = () => {
        try {
            const cropper = cropperRef.current?.cropper;
            if (cropper) {
                cropper.getCroppedCanvas({
                    width: 200,
                    height: 200,
                }).toBlob((blob) => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob); // create the URL on Blob
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "cropped.jpg"; // file's saved name
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url); // clear memory cache
                }, "image/jpeg", 0.9);
            }
        } catch (e) {
            // TODO add an error action
            console.error("crop error")
        }
    }

    const handleRotate = (ccw?: true) => {
        if (cropperRef.current === null) return;
        const cropper = cropperRef.current.cropper;
        cropper.rotate(ccw ? -90 : 90); // Поворот на 90 градусов
    };

    return (
        <div>
            <div style={{width: "100%"}}>
                <input type="file" onChange={onChange}/>
                {image && <>
                  <br/>
                  <br/>
                  <Cropper
                    ref={cropperRef}
                    style={{height: 400, width: "100%"}}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                  />
                  <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center"
                    }}
                  >
                    <p>Rotate image:</p>
                    <div
                      style={{
                          display: "flex",
                          gap: "5px",
                      }}
                    >
                      <button
                        onClick={() => {
                            handleRotate()
                        }}
                      >CW
                      </button>
                      <button
                        onClick={() => {
                            handleRotate(true)
                        }}
                      >CCW
                      </button>
                    </div>
                  </div>
                </>}
            </div>
            {image && <div>
              <div className="box" style={{width: "50%", float: "right"}}>
                <h1>Preview</h1>
                <div
                  className="img-preview"
                  style={{width: "100%", float: "left", height: "300px"}}
                />
              </div>
              <div
                className="box"
                style={{width: "50%", float: "right", height: "300px"}}
              >
                <h1>
                  <span>Crop</span>
                  <button style={{float: "right"}} onClick={getCropData}>
                    Crop Image
                  </button>
                </h1>
              </div>
            </div>}
            <br style={{clear: "both"}}/>
        </div>
    );
};

export default CropperBlock;
