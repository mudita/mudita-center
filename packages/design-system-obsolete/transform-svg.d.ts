declare module "@svgr/core" {
    function svgr(data: string, inputOptions: {
        icon: boolean
    }, outputOptions: {
        componentName: string
    }): Promise<string> 
    export default svgr
}