import Box from "@/app/components/styleComponents/Box";
import Button from "../styleComponents/Button";
import Link from "next/link";
import Close from "../Icons/Close";
import { motion } from "framer-motion";

export default function TaskNav({showNav, setShowNav} : {showNav?: boolean, setShowNav?: (show: boolean) => void}) {
    return (
        <motion.nav initial={{scaleY: '0%'}} whileInView={{scaleY: '100%'}} id='task-nav' className={`${showNav || 'hidden'} md:flex  w-full h-full z-10`}>
            <Box className="w-full flex flex-col justify-between px-4 py-2">
                <h1 className="text-2xl font-bold mb-6 w-full flex items-center justify-between">Tasks<Button variant="tertiary" className="active:scale-95 active:rotate-90 h-full" onClick={() => setShowNav && setShowNav(false)}><Close className="w-6 md:hidden"/></Button></h1>
                <div className="flex flex-col gap-4 items-start">
                    <Link onClick={() => setShowNav && setShowNav(false) } href={'/tasks?filter=all'}><Button variant="tertiary" className="text-lg w-full flex items-center font-semibold">All Tasks</Button></Link>
                    <Link onClick={() => setShowNav && setShowNav(false) } href={'/tasks'}><Button variant="tertiary" className="text-lg w-full flex items-center font-semibold">In Progress</Button></Link>
                    <Link onClick={() => setShowNav && setShowNav(false) } href={'tasks?filter=overdue'}><Button variant="tertiary" className="text-lg w-full flex items-center font-semibold">Overdue</Button></Link>
                    <Link onClick={() => setShowNav && setShowNav(false) } href={'tasks?filter=important'}><Button variant="tertiary" className="text-lg w-full flex items-center font-semibold">Important</Button></Link>
                    <Link onClick={() => setShowNav && setShowNav(false) } href={'tasks?filter=completed'}><Button variant="tertiary" className="text-lg w-full flex items-center font-semibold">Completed</Button></Link>
                    <Link onClick={() => setShowNav && setShowNav(false) } href={'tasks?filter=dropped'}><Button variant="tertiary" className="text-lg w-full flex items-center font-semibold">Dropped</Button></Link>
                </div>
            </Box>
        </motion.nav>
    )
}