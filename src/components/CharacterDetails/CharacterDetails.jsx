import { useContext } from 'react';
import AppContext from '../App/Context';
import './CharacterDetails.scss';

function CharacterDetails() {
    const [{ lastCharacterDetails }] = useContext(AppContext);

    if (!lastCharacterDetails) return <div />;

    return (
        <section className="character-details-container">
            <h2 className="character-details-title">Character Info</h2>
            <p className="character-gender">
                <b>Gender:</b>
                { ` ${lastCharacterDetails.gender || '<Not defined>'}` }
            </p>
            <p className="character-age">
                <b>Age:</b>
                { ` ${lastCharacterDetails.age || '<Not defined>'}` }
            </p>
        </section>
    );
}

export default CharacterDetails;
