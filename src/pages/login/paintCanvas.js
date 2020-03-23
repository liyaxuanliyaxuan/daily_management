 const paintCanvas = (_this) => {
    // document.getElementsByTagName('body')[0].style.background = '#fff'
    const canvas = _this.canvas.current;
    if (canvas && canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = '#bce0f0';
        ctx.shadowOffsetX = 20;
        ctx.shadowOffsetY = -10;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#b9ddef";
        ctx.strokeStyle = '#fff'
        ctx.beginPath();
        ctx.moveTo(468, 0);
        ctx.lineTo(572, 28);
        ctx.lineTo(0,28);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 20;
        ctx.shadowBlur = 14;
   
        ctx.beginPath();
        
        ctx.moveTo(572, 28);
        ctx.lineTo(408, 714);
        ctx.lineTo(0, 714);
        ctx.lineTo(0, 0);
        ctx.fill();
   

        ctx.shadowColor = "#b9ddef";
        ctx.beginPath();
        ctx.moveTo(468, 0);
        ctx.lineTo(572, 28);
        ctx.lineTo(408, 714);
        ctx.stroke();


    }
}
export default paintCanvas