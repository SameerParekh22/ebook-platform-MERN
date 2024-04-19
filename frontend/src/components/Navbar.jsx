import React from 'react'
import {useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
//importing react icons from react icon website
import {FaBlog} from "react-icons/fa6";
import {FaBarsStaggered} from "react-icons/fa6";
import {FaXmark} from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const [isSticky,setIsStickey] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(()=> {
    const handleScroll = () =>{
        if(window.scrollY > 100){
            setIsStickey(true);
        }
        else{
            setIsStickey(false);
        }
    }

    window.addEventListener("scroll",handleScroll);

    return () => {
        window.addEventListener("scroll",handleScroll)
    }
  })

  //navItems here
  const navItems = [
    {
        link: "Home",
        path:"/"
    },
    {
        link: "About",
        path:"/about"
    },
    {
        link: "Shop",
        path:"/shop"
    },
    {
        link: "Sell Your Book",
        path:"/admin/dashboard"
    },
    {
        link: "Blog",
        path:"/blog"
    },

  ]
  
  
    return (
    <header className ='w-full bg-transparent fixed top-0 left-0 right-0 transition-all fade-in duration-300'>
        <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-red-300" : ""}`}> {/*this is for transition of other colour while scrolling*/}
            <div className = 'flex justify-between items-center text-base gap-8'>
              <Link to="/" className='text-2x1 font-bold text-red-800 flex items-center'><FaBlog className='inline-block'/>Books</Link>
               {/*nav items for large devices*/}
               <ul className='md:flex space-x-12 hidden'>
                  {
                    navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-800'>{link}</Link>)
                  }
               </ul>


               {/* button for lg devices check this settings again once fully done*/}
               <div className='md:hidden space-x-12 hidden lg:flex items-center'>
                  <button><FaBarsStaggered className='w-5 hover:text-blue-800'/></button>
               </div>


               {/*menu button for the mobile devices*/}
               <div className='md:hidden'>
                <button onClick={toggleMenu} className='text-black focus:outline-none'>
                  {
                    isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered className='h-5 w-5 text-black'/>
                  }
                </button>
               </div>
            </div>


          {/*navitems for small devices*/}
          <div className={`space-y-4 px-4 mt-16 py-7 bg-red-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
            {
              navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
            }
          </div>
        </nav>
    </header>
  )
}

export default Navbar