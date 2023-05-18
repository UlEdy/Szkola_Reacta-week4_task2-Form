import Button from './Button';

const SentMessage = ({ handleClosing }) => {
    return (
        <div className='message'>
            <p>Thank you for sending</p>
            <Button
                label={'Close info'}
                onClick={handleClosing}
                type={'button'}
            />
        </div>
    );
};

export default SentMessage;
