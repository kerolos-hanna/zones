import React, {ChangeEvent, useState} from 'react';
import {Polygon} from "@react-google-maps/api";
import {useDispatch} from "react-redux";
import {bindActionCreators} from 'redux';
import Swal from "sweetalert2";

import * as actionCreators from '../../store/actions/actionCreators';
import {zone, points} from "../../store/reducer/zonesReducer";
import {Modal} from "../../UI/Modal/Modal";

interface IZoneProps {
    zones: zone[]
}

const Zone: React.FC<IZoneProps> = (props) => {
    const dispatch = useDispatch();
    const {deleteZone, updateZone, getAllZones} = bindActionCreators(actionCreators, dispatch);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [zoneClicked, setZoneClicked] = useState<zone>({label: "", color: "", points: []});

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setZoneClicked({...zoneClicked, [name]: value})
    }

    const openModalHandler = () => {
        setOpenModal(true);
    }
    const closeModalHandler = () => {
        setOpenModal(false);
    }
    const convertStrToNum = (points: points[]) => {
        return points.map(point => (
            {
                lat: parseFloat(point.lat),
                lng: parseFloat(point.lng)
            }
        ))
    }
    const polygonClickHandler = (e: google.maps.MapMouseEvent, zone: zone) => {
        openModalHandler();
        setZoneClicked(zone);
    }
    const onDeleteZone = () => {
        Swal.fire({
            title: 'Do you want to delete the zone?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteZone(zoneClicked._id);
                getAllZones();
                closeModalHandler()
            }
        })
    }
    const onModalSubmit = () => {
        updateZone(zoneClicked._id, zoneClicked);
        getAllZones();
        closeModalHandler()
    }
    return <>
        {openModal ?
            <Modal modalTitle="Zone Details" onModalClose={closeModalHandler} onModalSubmit={onModalSubmit}
                   submitTitle="Edit" onDeleteZone={onDeleteZone}>
                <div className="mb-3">
                    <label htmlFor="Zone-name" className="col-form-label">Zone Name:</label>
                    <input type="text" name="label" className="form-control" id="Zone-name"
                           value={zoneClicked.label} onChange={changeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Zone-Color" className="col-form-label">Zone Color:</label>
                    <input type="color" name="color" className="form-control" id="Zone-Color"
                           value={zoneClicked.color} onChange={changeHandler}/>
                </div>
            </Modal> : null}
        {props.zones.map(zone => (
            <Polygon key={zone.label}
                     paths={convertStrToNum(zone.points)}
                     onClick={(e) => polygonClickHandler(e, zone)}
                     options={{
                         fillColor: `${zone.color}`,
                         strokeOpacity: 0.5,
                         strokeWeight: 2
                     }}/>
        ))}
    </>
}

export {Zone};