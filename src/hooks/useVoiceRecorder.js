import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio";


const useVoiceRecorder = ()=> {

    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const recorderState = useAudioRecorderState(recorder);



    const requestPermissions = async ()=>{


         try{

            const permission = await AudioModule.requestRecordingPermissionsAsync();


            if (!permission.granted) {
                
                return false;
            }

            return true;

        }
        catch(error){

            console.log("Error requesting microphone permissions:", error);
        }

    }


    const startRecording = async ()=>{

        try{
            const hasPermission = await requestPermissions();

            if (!hasPermission) return;

            await setAudioModeAsync({
                allowsRecording: true,
                playsInSilentMode:true,
            })

            
            await recorder.prepareToRecordAsync();
            recorder.record();

            return recorder;
        }
        catch(error){

            console.log("Error starting recording:", error);
        }

    }


    const stopRecording = async ()=>{

        try{

            await recorder.stop();

            return recorder;

        }
        catch(error){
            console.log("Error stopping recording:", error);
        }

    }


    return{
        requestPermissions,
        startRecording,
        stopRecording,
        recorderState,
    }

    
}


export default useVoiceRecorder;