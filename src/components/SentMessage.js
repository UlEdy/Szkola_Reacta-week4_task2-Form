import Button from './Button';

const SentMessage = ({ handleClose }) => {
    return (
        <div className='message flex'>
            <p>Thank you for sending</p>
            <Button
                label={'Close info'}
                onClick={handleClose}
                type={'button'}
            />
        </div>
    );
};

export default SentMessage;
