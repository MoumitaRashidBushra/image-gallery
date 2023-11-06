import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        // Replace 'images.json' with the actual path to your JSON data.
        fetch('/images.json')
            .then((response) => response.json())
            .then((data) => setImages(data))
            .catch((error) => console.error('Error loading image data:', error));
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return; // Dropped outside the list

        const reorderedImages = [...images];
        const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, reorderedImage);

        setImages(reorderedImages);
    };
    const toggleImageSelection = (imageId) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(imageId)) {
                return prevSelectedImages.filter((id) => id !== imageId);
            } else {
                return [...prevSelectedImages, imageId];
            }
        });
    };

    const deleteSelectedImages = () => {
        const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
        setImages(updatedImages);
        setSelectedImages([]);
    };

    const droppableId = 'gallery-droppable'; // Unique identifier for the droppable area

    return (
        <>
            <div className='container mx-auto mt-10 px-16'>
                {selectedImages.length === 0 ? (
                    <h1 className="text-2xl font-bold mb-4">Gallery</h1>
                ) : (
                    <div className="flex justify-between mb-4">
                        <div className='text-2xl font-bold'>
                            Selected Files ({selectedImages.length})
                        </div>
                        <div>
                            <button
                                onClick={deleteSelectedImages}
                                className="bg-red-500 text-white px-2 py-1 rounded-md"
                            >
                                Delete Files
                            </button>
                        </div>
                    </div>
                )}
                <hr className='mb-6' />

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={droppableId} >
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-5 gap-4 overflow-x-auto max-w-full p-10"
                            >
                                {images.map((image, index) => (
                                    <Draggable
                                        key={image.id}
                                        draggableId={image.id.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`relative ${selectedImages.includes(image.id)
                                                    ? 'border border-blue-500'
                                                    : ''
                                                    } group transition duration-300 transform hover:scale-105`}
                                                onClick={() => toggleImageSelection(image.id)}
                                                style={{
                                                    gridColumn: index === 0 ? 'span 2' : 'span 1', // Set col-span-2 for the first image, and col-span-1 for others
                                                    gridRow: index === 0 ? 'span 2' : 'span 1', // Set row-span-2 for the first image, and row-span-1 for others
                                                }}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.src}
                                                    className="w-full h-auto"
                                                />


                                            </div>

                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
};

export default ImageGallery;
