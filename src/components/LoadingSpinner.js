import { motion } from "framer-motion";

const style = {
    width: 100,
    height: 10,
    opacity: 1,
    margin: 2,
    borderRadius: 2,
    display: "inline-block",
    background: "#c81c60",
}
  
const variants = {
    start: {
        scale: 0.2,
        rotate: 0,
    },
    end: {
        scale: 1,
        rotate: 360,
    },
}

export default function Loader({loadStatus, floatSet}) {
    // console.log(`In Loader. floatset: ${floatSet}`)

    if (!loadStatus){
        return null
    } else{
        return (
            <div style={{display:"flex", position: floatSet? "absolute" : "none", width:'100%', height:"100%", lineHeight:'230px'}}>
                <div className="mx-auto mt-5">
                <motion.div
                            style={style}
                            variants={variants}
                            initial={"start"}
                            animate={"end"}
                            transition={{    
                            repeat: "Infinity",
                            repeatType: "reverse",
                            ease: "backInOut",
                            duration: 1, 
                            delay: 0
                            }}
                        />
                <motion.div
                            style={style}
                            variants={variants}
                            initial={"start"}
                            animate={"end"}
                            transition={{    
                            repeat: "Infinity",
                            repeatType: "reverse",
                            ease: "backInOut",
                            duration: 1, 
                            delay: 1
                            }}
                        />
                <motion.div
                            style={style}
                            variants={variants}
                            initial={"start"}
                            animate={"end"}
                            transition={{    
                            repeat: "Infinity",
                            repeatType: "reverse",
                            ease: "backInOut",
                            duration: 1, 
                            delay: 2
                            }}
                        />    
                </div>
            </div>                
        )
    }
}