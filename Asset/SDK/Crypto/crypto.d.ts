/**
 * 加密
 */
declare module 'crypto' {
    /**
     * Crypto
     */
    export default class Crypto {
        /**
         * 创建Key
         * @param {number} length Key长度
         * @return {string} 返回Key
         */
        public static createKey(length: number): string;
    
        /**
         * Base64加密
         * @param {*} data 数据
         * @return {string} 加密后的数据字符串
         */
        public static encryptBase64(data: any): string;
    
        /**
         * MD5加密
         * @param {string} key 加密的Key
         * @param {*} data 数据
         * @return {string} 加密后的数据字符串
         */
        public static encryptMD5(key: string, data: any): string;
    
        /**
         * AES加密
         * @param {string} key 加密的Key
         * @param {*} data 数据
         * @return {string} 加密后的数据字符串
         */
        public static encryptAES(key: string, data: any): string;
    }
}
