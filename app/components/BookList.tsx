'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';
import { axiosInstance } from '@/lib/axiosInstance';

import InfiniteScroll from 'react-infinite-scroller';
import { RotatingSquare, TailSpin } from 'react-loader-spinner';
import { useSetRecoilState } from 'recoil';
import { booksLoading } from '@/lib/state/BookListState';

export default function BookList() {
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);
    const [fetching, setFetching] = useState(false);
    const setBooksAreLoading = useSetRecoilState(booksLoading);
    const [startPoint, setStartPoint] = useState(0);
    const [pullChange, setPullChange] = useState(0);

    const pullRange = 100;

    const pullStart = (e: TouchEvent) => {
        const { screenY } = e.targetTouches[0];
        setStartPoint(screenY);
    };
    const pull = (e: TouchEvent) => {

        const touch = e.targetTouches[0];

        const { screenY } = touch;

        let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
        setPullChange(pullLength);
    };
    const endPull = (e: TouchEvent) => {
        setStartPoint(0);
        setPullChange(0);
        if (pullChange > pullRange) refreshList();
    };

    const fetchBooks = useCallback(
        async () => {
            if (fetching) {
                return;
            }

            setFetching(true);
            setBooksAreLoading(true);
            try {

                const res = await axiosInstance.get('/api/books?page=' + page).catch((err) => {
                    return err;
                });

                if (res.err) {
                    throw Error("Connection interrupted")
                };

                if (res.data && res.data.length == 0) {
                    setPage(-1)
                    return;
                };

                setBooks([...books, ...res.data]);

                setPage(prev => prev + 1);
            } finally {
                setFetching(false);
                setBooksAreLoading(false);
            }
        },
        [fetching, setBooksAreLoading, page, books]
    );


    const refreshList = useCallback(
        async () => {
            if (fetching) {
                return;
            }

            setFetching(true);
            setBooksAreLoading(true);
            try {

                const res = await axiosInstance.get('/api/books?page=1').catch((err) => {
                    return err;
                });

                console.log(res.data);
                if (res.err || !res.data) {
                    throw Error("Connection interrupted")
                };

                if (res.data && res.data.length == 0) {

                    setPage(-1)
                    return;
                };

                setBooks([...res.data]);

                setPage(2);
            } finally {
                setFetching(false);
                setBooksAreLoading(false);
            }
        },
        [fetching, setBooksAreLoading]
    );


    useEffect(() => {
        window.addEventListener("touchstart", pullStart);
        window.addEventListener("touchmove", pull);
        window.addEventListener("touchend", endPull);
        return () => {
            window.removeEventListener("touchstart", pullStart);
            window.removeEventListener("touchmove", pull);
            window.removeEventListener("touchend", endPull);
        };
    });


    return (
        <div className="w-full px-4">

            <div
                className="flex flex-row items-center justify-center w-full "
                style={{ marginTop: pullChange / 3.118, }}
            >
                <div className="p-2 rounded-full">
                    <RotatingSquare
                        height="20"
                        width="20"
                        color="#4fa94d"
                        ariaLabel="rotating-square-loading"
                        strokeWidth="4"
                        wrapperStyle={{}}
                        wrapperClass="pb-4"
                        visible={pullChange / 3.118 > 2}
                    />

                    <TailSpin
                        height="20"
                        width="20"
                        color="black"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass="pb-4"
                        visible={fetching}
                    />
                </div>
            </div>


            <InfiniteScroll
                pageStart={1}
                loadMore={fetchBooks}
                hasMore={page != -1}

                className="grid w-full grid-cols-2 gap-y-2 gap-x-2 sm:grid-cols-3 md:grid-cols-4"
            >
                {books.map((book, index) => (
                    <Card
                        book={book}
                        key={book.id}
                        isLast={index == books.length - 1}
                        newLimit={() => setPage((prev) => prev + 1)}
                    />
                ))}{' '}
                {fetching && books.length != 0 && (
                    <div className='flex flex-row items-center justify-center w-full'>

                        <TailSpin
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        // visible={true}
                        />
                    </div>
                )
                }
            </InfiniteScroll>
            {/* {books.map((book, index) => <Card book={book} key={book.id} isLast={index == books.length - 1} newLimit={() => setPage(prev => prev + 1)} />)} */}
        </div>
    );
}
