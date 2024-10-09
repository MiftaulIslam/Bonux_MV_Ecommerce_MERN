import { useEffect, useState } from 'react'
import Hero from '../../static/hero_1.jpg'
import Carousel from '../../widgets/Carousel';
import { Link } from 'react-router-dom';
import MultiLevelDropDown from '../../widgets/MultiLevelDropDown.tsx';
import { GetService } from '../../utils/HTTP/Get.ts';
const HeroSection = () => {
    const [categories, setCategories] = useState(null)
    const getCategories = async ()=>{
        const categories = await GetService(`category/categories-order`) 
        if(categories){
            setCategories(categories.data.data);
        }
    }
    useEffect(() => {
     getCategories()
    }, [])
    
    return (
        <>
            {/* DropDown */}
            <div className='hidden md:block shadow-md w-[300px] h-full border overflow-y-auto overflow-x-hidden'>
                <MultiLevelDropDown items={categories} className=" py-1 w-[280px] relative text-[#757575] text-[14px]"/>
          
            </div>
            {/* Hero Slider */}
            <div className='h-full w-[100%]'>
                <Carousel>
                <Link to="/carousel"className='w-full h-full '>
                    
                <img src={Hero} className='w-full h-full object-fill' alt="" />
                </Link>
                <Link to="/carousel"className='w-full h-full '>
                 
                <img src={Hero} className='w-full h-full object-fill' alt="" />
                </Link>
                <Link to="/carousel"className='w-full h-full '>
                 
                <img src={Hero} className='w-full h-full object-fill' alt="" />
                </Link>
                <Link to="/carousel"className='w-full h-full '>
                  
                <img src={Hero} className='w-full h-full object-fill' alt="" />
                </Link></Carousel>
            </div>

        </>
    )
}

export default HeroSection