"use client"

import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils"

const PaginationComponent = ({ hasPrevPage, hasNextPage, triggerPagination, currentPage, totalPages, textColor, bgColor, descColor }) => {
    return (
        <div className='mt-5'>
            <div className="flex justify-center gap-5 mb-3 items-center">
                <Button 
                className={cn(
                    // textColor,
                    // bgColor,
                    "bg-[#222d28] border border-[#155a3c] text-[#85e0b7] hover:bg-[#389a6b] hover:text-white hover:border-[#3ed08e]",
                    !hasPrevPage ? "opacity-20" : "opacity-100"
                )}
                disabled={!hasPrevPage} 
                onClick={() => triggerPagination(-1)} 
                >Prev</Button>
                <Button 
                className={cn(
                    // textColor,
                    // bgColor,
                    "bg-[#222d28] border border-[#155a3c] text-[#85e0b7] hover:bg-[#389a6b] hover:text-white hover:border-[#3ed08e]",
                    !hasNextPage ? "opacity-20" : "opacity-100"
                )}
                disabled={!hasNextPage} 
                onClick={() => triggerPagination(1)} 
                >Next</Button>
            </div>

            <div className="flex justify-center gap-5 items-center">
                <span 
                className={cn(
                    "mx-2 text-xs",
                    descColor
                )}>
                    Page {currentPage} of {totalPages}
                </span>
            </div>
        </div>
    )
}

export default PaginationComponent