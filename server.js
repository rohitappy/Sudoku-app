const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

function validate(grid){
 let rows=[
   grid.slice(0,3),
   grid.slice(3,6),
   grid.slice(6,9)
 ];
 let errors=[];

 for(let r=0;r<3;r++){
   let s=new Set(rows[r]);
   if(s.size!==3 || [...s].some(n=>n<1||n>3)){
     for(let c=0;c<3;c++) errors.push(`c${r}${c}`);
   }
 }

 for(let c=0;c<3;c++){
   let col=[rows[0][c],rows[1][c],rows[2][c]];
   let s=new Set(col);
   if(s.size!==3 || [...s].some(n=>n<1||n>3)){
     for(let r=0;r<3;r++) errors.push(`c${r}${c}`);
   }
 }

 return errors;
}

app.post('/check',(req,res)=>{
 const g=req.body.grid;
 if(!Array.isArray(g)||g.length!==9) return res.json({success:false,message:"Invalid input"});
 const errs=validate(g);
 if(errs.length===0) return res.json({success:true,message:"✔ Sudoku is correct!",errors:[]});
 res.json({success:false,message:"❌ Incorrect Sudoku",errors:errs});
});

app.listen(3000,()=>console.log("Running"));
