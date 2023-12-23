import { environment } from '../../../environments/Environment';
import React, { useEffect } from 'react';
import axios from 'axios';

const API_URL = environment.API_URL; // Establece la URL de tu API

/**
 * Verifica si un token JWT ha expirado.
 * @param {string} token - Token JWT a verificar.
 * @returns {boolean} - Devuelve true si el token ha expirado
 */
const isTokenExpired = (token:string) => {
    try {
      return JSON.parse(atob(token.split('.')[1])).exp < Math.floor(Date.now() / 1000);
    } catch (error) {
      // Si hay un error, se asume que ha expirado
      return true;
    }
};

const isActive = () => {
    const token = localStorage.getItem('accessToken') || '';
    if (token && !isTokenExpired(token)) {
        return true;
    }
    return false; // Devuelve true si el token existe
};

const canActivate = async () => {
    const token = localStorage.getItem('accessToken') || '';
    if (token && !isTokenExpired(token)) {
        return true;
    }
    const isRefreshSuccess = await refreshingToken();
    if (!isRefreshSuccess) {
        window.location.href = '/login';
    }
    return isRefreshSuccess;
};

const refreshingToken = async () => {
    const tkn = localStorage.getItem('refreshToken');
    let isRefreshSuccess = false;
    try {
        if (tkn && !isTokenExpired(tkn)) {
            const response = await fetch(`${API_URL}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: tkn
                }),
            });
            const resp = await response.json();
            if (resp) {
                localStorage.setItem('refreshToken', resp?.refreshToken ?? tkn);
                localStorage.setItem('accessToken', resp?.accessToken ?? '');
                console.log('REFRESH', resp);
                isRefreshSuccess = true;
            }
        } else {
            localStorage.setItem('refreshToken', '');
            localStorage.setItem('accessToken', '');
        }
    } catch (ex) {
        isRefreshSuccess = false;
    }
    return isRefreshSuccess;
};

/**
 * Inicia sesión.
 * @param {string} credentials - Objeto {
        username: string;
        password: string;
        remember: string;
        time_zone: string;
        previous: PageType;
        language: string | null;
    }
 */
const login = async (credentials:any) => {
    let logRespon = {
        isOk: false,
        msg: ''
    };
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const resp = await response.json();
        if (resp) {
            logRespon.isOk = true;
            localStorage.setItem('accessToken', resp.accessToken || '');
            localStorage.setItem('refreshToken', resp.refreshToken || '');
            localStorage.setItem('userLanguage', resp.userLanguage || '');
        }
    } catch (error) {
        logRespon.msg = '';
        console.error('ERROR:', error);
        // throw error;
    }
    return logRespon;
};

/**
 * Destruye la sesión.
 * @param {boolean} goLogin - Bandera para saber si redirigir o no al login
 */
const logout = (goLogin:boolean) => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    if (goLogin) {
        window.location.href = '/login';
    }
};

export const AuthService = {
    login: login,
    logout: logout,
    isActive: isActive,
    canActivate: canActivate,
    refreshingToken: refreshingToken,
};
