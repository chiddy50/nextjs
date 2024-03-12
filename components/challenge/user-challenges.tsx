"use client"

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from '@/components/ui/use-toast';
import { getCookie, deleteCookie } from 'cookies-next';
import { AppContext } from '@/context/StoryContext';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
  

const UserChallenges = () => {

    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedChallenge, setSelectedChallenge] = useState(false)
    const { setUserLoggedIn } = useContext(AppContext)
    
    const promptStartChallenge = (challenge: any) => {
        console.log(challenge);

        const timeExpired = isDateTimePast(challenge.date, challenge.time)
        if (timeExpired) {
            toast({
                title: "Challenge expired",
                description: "Challenge expired",
            })
            return
        }

        setSelectedChallenge(challenge)
        const confirmStartModal = document.getElementById("confirm-start-modal");
        if (confirmStartModal) {            
            confirmStartModal.style.display = "block";
        }
    }

    function isDateTimePast(dateString: string, timeString: string) {
        // Parse the date and time strings
        const [year, month, day] = dateString.split("-");
        const [hours, minutes] = timeString.split(":");
        
        // Create a Date object for the input datetime
        const dateTime = new Date(year, month - 1, day, hours, minutes);
    
        // Get the current date and time
        const currentDate = new Date();
    
        // Compare the input datetime with the current datetime
        return currentDate.getTime() > dateTime.getTime();
    }

    useEffect(() => {
        fetchChallenges()
    }, [])

    const fetchChallenges = async () => {        
        try {   
            setLoading(true)      
                        
            let response = await axiosInterceptorInstance.get(`challenges/all`)
            console.log(response);
            
            setChallengesData(response?.data?.challenges.slice(0, 4));
        } catch (error) {
            console.log(error);            
            let message = error?.response?.data?.message
            
            if (message && message === 'jwt expired') {
                console.log(message);
                deleteCookie('token')
                localStorage.removeItem("user") 
                localStorage.removeItem("question") 
                setUserLoggedIn(false)
            }
        }finally{
            setLoading(false)         
        }
        
    }

    const buttonLabels = [1,2,3,4];

    return (
        <>        
            { loading && <div className='grid grid-cols-4 gap-5'>
                {
                    buttonLabels.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                }

            </div>}

            {
                !loading && 
                <>
                    <div className='grid  gap-5 mb-10 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {/* <div className='grid gap-5 mb-10 grid-cols-4'> */}

                        {
                            challengesData.map((challenge, index) => (

                                <Challenge key={index} 
                                clickEvent={() => promptStartChallenge(challenge)} 
                                challenge={challenge} 
                                type="user"                                
                                />
                            ))
                        }

                    
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            }

            <ConfirmStartChallenge challenge={selectedChallenge}/>
        </>
    )
}

export default UserChallenges