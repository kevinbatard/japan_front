import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../styles/details-style.css';
import { TInterests } from '../../interests/types/TInterests';
import { TRegion } from '../../Types/TRegion';
import DeleteInterest from '../../interests/components/DeleteInterest';
import { UserContext } from '../../context/user-context';
import { useContext, useState } from 'react';
import UpdateInterest from '../../interests/components/UpdateInterest';

export default function MapInterest(props: {
    interests: TInterests[];
    dataRegion: TRegion[];
    setInterests: React.Dispatch<React.SetStateAction<TInterests[]>>;
}) {
    const { user } = useContext(UserContext);
    const [hide, setHide] = useState<boolean>(false);
    const [dataInterest, setDataInterest] = useState<TInterests | null>(null);

    const thisRegion = props.interests.filter(
        (elm) => elm.region.name === props.dataRegion[0].name
    );

    const handleInterest = (value: TInterests) => {
        const newInterests = [...props.interests];
        newInterests[dataInterest!.id] = value;
        props.setInterests(newInterests);
    };

    const marks = thisRegion.map((elm, i) => {
        return (
            <div key={i}>
                <Marker position={[elm.latitude, elm.longitude]}>
                    <Popup>
                        <h5>{elm.name}</h5>
                        <p>
                            {elm.category.name}
                            <br />
                            <br />
                            {elm.adress}
                        </p>
                        <div className="text-end">
                            {hide === false
                                ? user.pseudo === elm.user.pseudo && (
                                      <button
                                          className="btn btn-primary me-2"
                                          type="button"
                                          data-bs-target="#updateInterest"
                                          data-bs-toggle="modal"
                                          onClick={() => setDataInterest(elm)}
                                      >
                                          Modifier
                                      </button>
                                  )
                                : ''}
                            {user.pseudo === elm.user.pseudo ||
                            user.access_lvl === 2 ? (
                                <DeleteInterest
                                    hide={hide}
                                    setHide={setHide}
                                    popId={elm.id}
                                    interests={props.interests}
                                    setInterests={props.setInterests}
                                />
                            ) : null}
                        </div>
                    </Popup>
                </Marker>
            </div>
        );
    });

    return (
        <>
            <MapContainer
                center={[
                    props.dataRegion[0].mapLat,
                    props.dataRegion[0].mapLon,
                ]}
                zoom={7}
                scrollWheelZoom={false}
                className="map row border border-3 border-danger rounded-4 mb-4"
            >
                {' '}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marks}
            </MapContainer>
            <UpdateInterest
                dataInterest={dataInterest}
                setInterests={(value: TInterests) => handleInterest(value)}
            />
        </>
    );
}
