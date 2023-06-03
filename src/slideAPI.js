import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';

const SlideViewer = () => {
    const [slideLinks, setSlideLinks] = useState([]);

    useEffect(() => {
        const getSlideLinks = async () => {
            try {
                // Initialize Google Slides API client
                const auth = await google.auth.getClient({
                    // Add necessary authentication configuration here
                    scopes: ['https://www.googleapis.com/auth/presentations.readonly'],
                });
                const slidesAPI = google.slides({ version: 'v1', auth });

                // Define the presentation ID and retrieve the slide information
                const presentationId = '1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow';
                const response = await slidesAPI.presentations.get({
                    presentationId,
                    fields: 'slides(objectId)',
                });

                // Get the base URL for the presentation
                const baseUrl = `https://docs.google.com/presentation/d/${presentationId}/present`;

                // Retrieve the current slide link for each slide
                const slideLinks = response.data.slides.map((slide) => {
                    const slideId = slide.objectId;
                    const slideUrl = `${baseUrl}#slide=id.${slideId}`;
                    return { slideId, slideUrl };
                });

                setSlideLinks(slideLinks);
            } catch (error) {
                console.error('Error retrieving slide links:', error);
            }
        };

        getSlideLinks().then(r => console.log(r));
    }, []);

    return (
        <div>
            {slideLinks.map((slide) => (
                <div key={slide.slideId}>
                    Slide {slide.slideId}: <a href={slide.slideUrl}>{slide.slideUrl}</a>
                </div>
            ))}
        </div>
    );
};

export default SlideViewer;
