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
        window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-f2e43bd877a4840734efb9c8cfd5ebd679223cb4d237d280e5fba672cd999054&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code`;
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
