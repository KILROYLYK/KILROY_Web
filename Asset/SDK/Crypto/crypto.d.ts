/**
 * 加密
 */
declare module 'crypto' {
    /**
     * Crypto
     */
    export default class Crypto {
        public static createKey(length: number): string;
        
        public static encryptBase64(data: any): string;
        
        public static encryptMD5(key: string, data: any): string;
        
        public static encryptAES(key: string, data: any): string;
    }
}
