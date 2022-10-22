import React from 'react';
import { useMemo } from 'react';
import cl from './pageNavigation.module.scss';

const PageNavigation = ({ totalPages, isLoading, currentPage, changePage}) => {
    const maxCountPages = 9;
    const changePageDoubleArrow = 9;
    const changePageArrow = 1;

    const arrowsClasses = useMemo( () => {
        let arrowsClasses = [cl.navigation__dPrev, cl.navigation__prev, cl.navigation__next, cl.navigation__dNext];

        if (currentPage === 1)
        {
            arrowsClasses[0] = cl.navigation__disDPrev;
            arrowsClasses[1] = cl.navigation__disPrev;
        }

        if (currentPage === totalPages)
        {
            arrowsClasses[2] = cl.navigation__disNext;
            arrowsClasses[3] = cl.navigation__disDNext;
        }

        return arrowsClasses;
    }, [totalPages, currentPage]);

    const pages = useMemo(() => {
        let pages = [];
        let beginningPage = (totalPages > 9 && currentPage > maxCountPages / 2) ? currentPage - Math.floor(maxCountPages / 2) : 1;
        
        if (totalPages > 9 && currentPage + maxCountPages / 2 > totalPages)
        {
            beginningPage = beginningPage + totalPages - currentPage - Math.floor(maxCountPages / 2);
        }

        for(; beginningPage <= totalPages && pages.length < maxCountPages; ++beginningPage)
        {
            pages.push(beginningPage);
        }

        return pages;
    }, [totalPages, currentPage]);

    return (
        <div>
            {(!isLoading) &&
                <div className={cl.navigation}>
                    <div className={arrowsClasses[0]} onClick={() => changePage(currentPage - changePageDoubleArrow)}></div>
                    <div className={arrowsClasses[1]} onClick={() => changePage(currentPage - changePageArrow)}></div>

                    <div className={cl.navigation__pages}>
                        {pages.map(page =>
                        {
                            if (page === currentPage)
                                return (
                                    <div className={`${cl.navigation__numberPage} ${cl.navigation__currentPage}`}
                                        onClick={() => changePage(page)}
                                        key={"page" + page}>
                                        {page}
                                    </div>
                                )
                            
                            return (
                                <div className={cl.navigation__numberPage}
                                    onClick={() => changePage(page)}
                                    key={"page" + page}>
                                    {page}
                                </div>
                            )
                        }
                        )}
                    </div>

                    <div className={arrowsClasses[2]} onClick={() => changePage(currentPage + changePageArrow)}></div>
                    <div className={arrowsClasses[3]} onClick={() => changePage(currentPage + changePageDoubleArrow)}></div>
                </div>
            }
        </div>
    );
};

export default PageNavigation;