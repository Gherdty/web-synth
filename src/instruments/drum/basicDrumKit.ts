import * as Tone from "tone";

const playDrumSample = async (sample: string) => {
  const player = new Tone.Player();
  // Await the loading of the file
  await player.load(sample); // Adjust the path as needed
  // Connect the player to the speakers and start the audio
  player.toDestination();
  player.start();
};

export async function basicDrumKit(selected: number[] | null) {
  if (selected === null) return
  const samples = selected.map(async (selected) => {
    switch (selected) {
      case 0:
        playDrumSample("/samples/OS_FEEL_kick_acoustic.wav");
        break;
      case 1:
        playDrumSample("/samples/ROBOTAKI_snare_one_shot_impala.wav");
        break;
      case 2:
        playDrumSample("/samples/RKU_FL_snare_one_shot_underwater.wav");
        break;
      case 3:
        playDrumSample("/samples/OS_SHE_snap_duo.wav");
        break;
      case 4:
        playDrumSample("/samples/FKI_clap_10.wav");
        break;
      case 5:
        playDrumSample("/samples/91V_RV_rim_new_york.wav");
        break;
      case 6:
        playDrumSample("/samples/PMLB_Hi-Hat_02.wav");
        break;
      case 7:
        playDrumSample("/samples/DBM_SDRNB_OPENHIHAT_06.wav");
        break;
    }
  });
  await Promise.all(samples);
}