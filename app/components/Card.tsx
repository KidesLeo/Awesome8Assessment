"use client";

import { useEffect, useRef } from 'react';

import Image from "next/image";

export default function Card({ book, isLast, newLimit }: { book: Book, isLast: boolean, newLimit: () => void }) {

    /**
   * Select the Card component with useRef
   */
    const cardRef = useRef();

    /**
     * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
     */
    useEffect(() => {
        if (!cardRef?.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                newLimit();
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardRef.current);
    }, [isLast, newLimit]);

    return (<div className="w-full">
        <Image
            src={book.coverImage}
            alt={book.title + " cover image"}
            width={180}
            height={200}
            className="h-[250px] bg-[#D0D0D0]"
        />
        <div className="flex flex-col py-1 px-2 gap-y-2">
            <h3 className="text-sm font-normal">{book.title}</h3>
            <div className="flex flex-row justify-between">
                <div className="text-red-500 font-normal text-sm ">{book.discountRate + '%'}</div>
                <div className="font-normal text-sm">{book.price + " 원"}</div>
            </div>
        </div>
    </div>)
}