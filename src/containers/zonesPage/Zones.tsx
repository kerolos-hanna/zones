import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {DrawingManager, GoogleMap, useJsApiLoader} from '@react-google-maps/api';

import {addZone, getAllZones, logout} from "../../store/actions/actionCreators";
import {State} from "../../store/store";
import {points, zone} from "../../store/reducer/zonesReducer";
import {Zone} from "../../components/zones/Zone";
import {Modal} from "../../UI/Modal/Modal";

interface IZonesPageProps {
    getAllZones: () => void,
    addZone: (zone: zone) => void,
    logout: () => void,
    zones: zone[]
}

const ZonesPage: React.FC<IZonesPageProps> = (props) => {
    const [draw, setDraw] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [points, setPoints] = useState<points[]>([]);
    const [state, setState] = useState<{ zoneName: string, zoneColor: string }>({zoneName: "", zoneColor: "#1f1e1e"});

    useEffect(() => {
        props.getAllZones()
        // eslint-disable-next-line
    }, [])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }
    const submitHandler = () => {
        if (!state.zoneName && !state.zoneColor) return;
        const zone: zone = {
            label: state.zoneName,
            color: state.zoneColor,
            points: points
        }
        props.addZone(zone);
        props.getAllZones();
        closeModalHandler();
    }
    const openModalHandler = () => {
        setOpenModal(true);
    }
    const closeModalHandler = () => {
        setOpenModal(false);
    }
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })
    const mapRef = useRef<google.maps.Map<Element> | null>(null);
    const onLoad = (map: google.maps.Map<Element>): void => {
        mapRef.current = map;
    }
    const unMount = () => {
        mapRef.current = null;
    }

    const containerStyle = {
        width: '100%',
        height: '100vh'
    };
    const onPolygonComplete = (e: google.maps.Polygon) => {
        const points = e.getPath().getArray().map(point => ({lat: point.lat().toString(), lng: point.lng().toString()}))
        setPoints(points);
        openModalHandler();
    }

    const exportZones = (exportDataJSON: zone[], exportName: string) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportDataJSON));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    return (
        <>
            {openModal ? <Modal modalTitle="Add Zone" onModalClose={closeModalHandler} onModalSubmit={submitHandler}
                                submitTitle="Add">
                <>
                    <div className="mb-3">
                        <label htmlFor="Zone-name" className="col-form-label">Zone Name:</label>
                        <input type="text" name="zoneName" className="form-control" id="Zone-name"
                               onChange={changeHandler}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Zone-Color" className="col-form-label">Zone Color:</label>
                        <input type="color" name="zoneColor" className="form-control" id="Zone-Color"
                               onChange={changeHandler}/>
                    </div>
                </>
            </Modal> : null}
            {isLoaded ?
                <div style={{display: "flex"}}>
                    <button className="btn btn-info"
                            style={{top: "4px", width: "9rem", zIndex: 1, right: '25px', position: "fixed"}}
                            onClick={() => setDraw(!draw)}>{draw ? "UnDraw" : "Draw"}</button>
                    <button className="btn btn-warning" onClick={() => exportZones(props.zones, "zones")}
                            style={{top: "45px", width: "9rem", zIndex: 1, right: '25px', position: "fixed"}}>Export
                        Zones
                    </button>
                    <button className="btn btn-danger"
                            style={{top: "4px", left: "5px", width: "9rem", zIndex: 1, position: "fixed"}}
                            onClick={props.logout}>Logout
                    </button>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        options={{zoomControl: true, disableDefaultUI: true}}
                        zoom={7}
                        center={{lat: 30.044247, lng: 31.227669}}
                        onLoad={onLoad}
                        onUnmount={unMount}
                    >
                        {draw ? <DrawingManager
                            drawingMode={google.maps.drawing.OverlayType.POLYGON}
                            onPolygonComplete={onPolygonComplete}
                            onUnmount={(e) => e.setMap(null)}
                            options={{
                                polygonOptions: {
                                    fillColor: state.zoneColor,
                                    strokeOpacity: 0.5,
                                    strokeWeight: 5,
                                    zIndex: 1,
                                }
                            }}
                        /> : null}
                        {props.zones.length !== 0 ? <Zone zones={props.zones}/> : null}
                    </GoogleMap>
                </div> : <div>Map Loading...</div>}
        </>

    )
}

const mapStateToProps = (state: State) => {
    return {
        zones: state.zones.zones
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getAllZones: () => dispatch<any>(getAllZones()),
        addZone: (zone: zone) => dispatch<any>(addZone(zone)),
        logout: () => dispatch<any>(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZonesPage);