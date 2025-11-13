'use client'

import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Image from 'next/image';

export default function Gallery({ photos, length, alt }) {
    return (
        
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        thumbWidth={80}
        zoomFromOrigin={true}
        backdropDuration={300}
        mode="lg-fade"
        closable={true}
      >
        
        {Array.from({ length: length }, (_, index) => (
                    <a href={`/Portfolio/${photos}/${index+1}.webp`} key={index} className="gallery-item">
                        <Image src={`/Portfolio/${photos}/${index+1}.webp`} alt={`Проект дома ${alt}`} className="w-full rounded-lg" width={1900} height={1200}/>
                    </a>
                ))}
        {/* {photos.map((photo, index) => (
          <a href={photo.src} key={index}>
            <img src={photo.src} alt={photo.alt} className="w-full rounded-lg" />
          </a>
        ))} */}
      </LightGallery>
    );
  }