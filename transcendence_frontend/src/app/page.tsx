'use client'
import React from 'react'
import './page.css'
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles-engine";
import { useCallback } from 'react';


function Connect() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);
    const handleLogin = () => {
        window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-4b59d2f3b0782fd287b010ca8d60afc6c2c83a39f298c46d0165eec2e5f86fa8&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Flogin%2Fcallback&response_type=code`;
      };
    return (
        <>
        <div className="btn" onClick={handleLogin}>
            <a className='btn-1' href="javascript:void(0)">Login</a>
            
        </div>
        <Particles options={particlesOptions as ISourceOptions} init={particlesInit}/>
        </>
    )
}

export default Connect
