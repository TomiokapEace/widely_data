import Card from "@/components/Card";
import {useEffect, useState} from "react";
import {WidelyDataGetDataSelect} from "@/pages/WidelyData/WidelyDataController";

export default () => {
    const [food,setFood] =useState<any>({})
    const [scenicSpot,setScenicSpot] =useState<any>({})
    const [culture,setCulture] =useState<any>({})
    useEffect(()=>{
        WidelyDataGetDataSelect({current:1,pageSize:100,type:"食物"}).then(res=>{
            setFood(res.data.records)
        })
        WidelyDataGetDataSelect({current:1,pageSize:100,type:"景点"}).then(res=>{
            setScenicSpot(res.data.records)
        })
        WidelyDataGetDataSelect({current:1,pageSize:100,type:"文化"}).then(res=>{
            setCulture(res.data.records)
        })
    },[])

    return <>
        <div style={{borderBottom:"1px solid black"}}>
            <h2 >家乡食物</h2>
        </div>
        <Card jsonArr={food}></Card>
        <div style={{borderBottom:"1px solid black"}}>
            <h2 >家乡文化</h2>
        </div>
        <Card jsonArr={culture}></Card>
        <div style={{borderBottom:"1px solid black"}}>
            <h2 >家乡景点</h2>
        </div>
        <Card jsonArr={scenicSpot}></Card>
    </>
}
