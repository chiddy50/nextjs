"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Challenge from '@/components/challenge/challenge'
import ConfirmStart from '@/components/challenge/confirm-start';
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import UserChallenges from '@/components/challenge/user-challenges';
import { cn } from "@/lib/utils"


export default function ChallengesPage() {
    const count = [1,2,3,4,5];

    return (
        <div className='layout-width '>

            <div className="flex items-center justify-between mb-7 xs:flex-col sm:flex-col md:flex-row xs:gap-4 sm:gap-4" 
            style={{ marginTop: "8rem" }}>
                <h1 className='text-white xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl  font-bold '>Choose Your Challenge</h1>
                <div className=" pr-3 bg-gray-50 border border-gray-300 rounded-lg">
                    <select id="countries" className="border-none rounded-lg text-gray-900 text-xs block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none">
                        <option selected disabled>Filter</option>
                        <option value="expired">All</option>
                        <option value="expired">Expired</option>
                        <option value="active">Active</option>
                    </select>
                </div>
            </div>           

            <div className=' rounded-2xl p-5 mb-40'>
                <UserChallenges />
            </div>
            
            <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                    
                    <div className='bg-[#3F4447] text-gray-300 rounded-2xl p-5 mb-10 border border-gray-500'>
                        <h1 className='font-semibold text-center mb-3 text-gray-300 text-2xl'>Rankings</h1>
                    
                        {
                            count.map((item, index) => (
                        
                                <div key={index} className={cn(
                                    "p-4 flex items-center border border-gray-500 rounded-xl mb-3 xs:gap-4 sm:gap-10 xs:flex-col sm:flex-row",
                                    item == 1 ? "border-orange-400  border-2" : ""
                                    )}>
                                    <h2 className="font-bold text-4xl">#{item}</h2>

                                    <div className="flex items-center gap-2">
                                        <div className=" h-10 w-10 flex items-center justify-center bg-black rounded-full">
                                            <i className='bx bxs-user text-white text-xl'></i>
                                        </div>
                                        <h1>Jane Cooper</h1>
                                    </div>

                                    <h1 className='text-xs '>10 wins</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <div className='bg-[#3F4447] text-gray-300 rounded-2xl p-5 mb-10 border border-gray-500'>
                        <h1 className='font-semibold text-center text-lg mb-3 text-gray-300'>Past 7 days Winners</h1>
                        <div className="p-4 flex items-center justify-between border rounded-xl xs:gap-4 sm:gap-4 xs:flex-col sm:flex-row border-gray-500">

                            <div className="flex items-center xs:gap-4 sm:gap-4 xs:flex-col sm:flex-row">
                                <h2 className="font-bold text-4xl mr-10">#1</h2>
                                <div className=" h-10 w-10 flex items-center justify-center bg-black rounded-full mr-2">
                                    <i className='bx bxs-user text-white text-xl'></i>
                                </div>
                                <h1>Jane Cooper</h1>
                            </div>

                            <h1 className='text-xs '>$2000</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
