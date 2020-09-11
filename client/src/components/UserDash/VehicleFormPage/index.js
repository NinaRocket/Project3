import React from 'react';
import "./style.css";
import { useDriverKickContext } from '../../../utils/DriverKickContext';
import GlobalNavBar from '../../GlobalNavBar';
import AddVehicleMainWrapper from '../AddVehicleMainWrapper'
import UserNewVehicleForm from '../UserNewVehicleForm'


function VehicleFormPage() {
    const { setNavType } = useDriverKickContext();
    setNavType("newVehicle");


    return (

        <section>
            <GlobalNavBar />
            <AddVehicleMainWrapper>
                <UserNewVehicleForm />
            </AddVehicleMainWrapper>
        </section>

    );
}

export default VehicleFormPage;