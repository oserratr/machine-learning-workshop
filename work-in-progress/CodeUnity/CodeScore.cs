using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using Firebase.Database;
using UnityEngine.UI;


[Serializable]

public class dataPosterCount{
    public int PosterIndex;
    public bool Poster1Switch;
    public bool Poster2Switch;
    public bool Poster3Switch;
    public bool Poster4Switch;
}

public class GoblinCounter : MonoBehaviour
{

    public int count;
    public Text scoreCount;
     public dataPosterCount dts;
   DatabaseReference dbRef;

    bool previousPoster1SwitchState;
 bool previousPoster2SwitchState;
 bool previousPoster3SwitchState;
 bool previousPoster4SwitchState;


public void Start(){
    count = 0;
}

     public void Awake(){
    dbRef = FirebaseDatabase.DefaultInstance.RootReference;
   }

    // Update is called once per frame
    void Update()
    {
        
        LoadDataFn();

      if (dts.Poster1Switch != previousPoster1SwitchState)
    {
        previousPoster1SwitchState = dts.Poster1Switch;

        if (dts.Poster1Switch)
        {
          count = count + 1;
        }        
    }
    if (dts.Poster2Switch != previousPoster2SwitchState)
    {
        previousPoster2SwitchState = dts.Poster2Switch;

        if (dts.Poster2Switch)
        {
          count = count + 1;
        }        
    }    if (dts.Poster3Switch != previousPoster3SwitchState)
    {
        previousPoster3SwitchState = dts.Poster3Switch;

        if (dts.Poster3Switch)
        {
          count = count + 1;
        }        
    }    if (dts.Poster4Switch != previousPoster4SwitchState)
    {
        previousPoster4SwitchState = dts.Poster4Switch;

        if (dts.Poster4Switch)
        {
          count = count + 1;
          print("process is complete");

        }        


        

    }
    scoreCount.text = count.ToString();
    
    }

    public void LoadDataFn()
    {
        StartCoroutine(LoadDataEnum());
    }


    IEnumerator LoadDataEnum() 
    {
        var serverData = dbRef.GetValueAsync();
        yield return new WaitUntil(predicate: () => serverData.IsCompleted);

        //print("process is complete");

        DataSnapshot snapshot = serverData.Result;
        string jsonData = snapshot.GetRawJsonValue();

        if (jsonData != null)
        {
            //print("server data found");

            dts = JsonUtility.FromJson<dataPosterCount>(jsonData);
        }
        else {
           // print("no data found");
        }

    }

}

