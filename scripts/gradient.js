/**
 * The Gradient class is responsible for creating and formating the gradient that is generated and edited
 */
class Gradient {
    /**
     * @param {number} colorCount - Number of colors that the gradient should initially contain 
     */
    constructor(colorCount){
        this.colorID = 0
        this.colorCount = colorCount
        this.gradient = ""
        this.colors = {}

        this.newColors()
        
    }

    /**
     * Creates the new gradient 
     */
    newColors(){
        for (let i = 0; i < this.colorCount; i++) {
            this.addColorToObject()
        }
        this.updateGradientString()
    }

    /**
     * Generates new gradient colors for an already existing gradient
     */
    randomizeColors(){
        for (const [key, color] of Object.entries(this.colors)) {
            color.newColor()
        }
        this.updateGradientString()
    }

    /**
     * Adds a ner color to the gradient
     */
    addColorToGradient(){
        this.colorCount++
        this.addColorToObject()
        this.updateGradientString()
    }

    /**
     * Removes a specific color from the gradient
     * @param {string} ID -  ID if the color
     */
    removeColorFromGradient(ID){
        this.colorCount--
        
        delete this.colors[ID]
        this.updateGradientString()
    }

    /**
     * updates a the gradient string that is used to change the DOM style
     */
    updateGradientString(){
        let gradient = "linear-gradient("
        let nrItems = 1
        for (const [key, color] of Object.entries(this.colors)) {
            gradient += color.rgb

            if(nrItems == Object.keys(this.colors).length){
                gradient += ")"
            } else {
                gradient += ", "
                nrItems++
            }
        }
        this.gradient = gradient
    }

    
    /**
     * Updates a existing with a new value
     * @param {string} ID 
     * @param {string} letter 
     * @param {*} value 
     */
    updateColorValue(ID, letter, value){
        this.colors[ID][letter] = value
        this.colors[ID].updateRGB()
        this.updateGradientString()
    }
    
    /**
     * Adds a color to the color object
     */
    addColorToObject(){
        let color = new Color(this.colorID)
        this.colors[this.colorID] = color
        this.colorID++
    }
}