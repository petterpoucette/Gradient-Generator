/**
 * The color class is responsible for generating and formating a separate color
 */
class Color{
    /**
     * @param {string} ID - ID on the color that is created
     */
    constructor(ID){
        this.r = this.randomValue()
        this.g = this.randomValue()
        this.b = this.randomValue()

        this.rgb = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"

        this.ID = ID

        this.hex = "#" + this.translateToHex(this.r, this.g, this.b)

        this.lock = false
    }

    /**
     * Setters
     */
    set r(value){
        this._r = value
        //this.updateRGB()
    }
    set g(value){
        this._g = value
        //this.updateRGB()
    }
    set b(value){
        this._b = value
        //this.updateRGB()
    }

    /**
     * Getters
     */
    get r(){return this._r}
    get g(){return this._g}
    get b(){return this._b}

    /**
     * Generates a new value
     */
    newColor(){
        if(!this.lock){
            this.r = this.randomValue()
            this.g = this.randomValue()
            this.b = this.randomValue()

            this.updateRGB()
        }
        
    }

    /**
     * updates teh rgb and hex string
     */
    updateRGB(){
        this.rgb = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
        this.hex = "#" + this.translateToHex(this.r, this.g, this.b)
    }


    /**
     *  Randomizes a value between 0 and 255
     */ 
    randomValue(){
        return Math.floor(Math.random() * 256);
    }

    /**
     * Translates the rgb values to a hex string
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     */
    translateToHex(r, g, b){
        r = this.calculateHEX(r)
        g = this.calculateHEX(g)
        b = this.calculateHEX(b)

        return r + g + b
    }

    /**
     * Calulates the hex value from a rgb value
     * @param {number} value - value to be translated
     */
    calculateHEX(value){
        let v = value/16
        let n = ("" + v).split(".")[0]
        let d = ("0." + ("" + v).split(".")[1]) * 16
        if(!d){d = 0}
        let one = colorData.RGBHEX[n]
        let two = colorData.RGBHEX[d]

        return  one + two
    }

    
    
}
