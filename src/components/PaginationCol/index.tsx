import {Col, Pagination, Row} from "antd";

export default (prop:any)=>{
    let {total} = prop
    return  <Row>
        <Col span={12} offset={10} style={{marginTop:10}}>
            <Pagination defaultCurrent={1} total={total} hideOnSinglePage={true} pageSize={5} onChange={()=>{
                console.log("?")}} />
        </Col>
    </Row>
}