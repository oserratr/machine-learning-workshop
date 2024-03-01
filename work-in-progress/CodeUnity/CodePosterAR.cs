using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using Firebase.Database;


[Serializable]

public class dataPoster4{
    public int PosterIndex;
        public bool Poster1Switch;
    public bool Poster2Switch;
    public bool Poster3Switch;
    public bool Poster4Switch;
}

public class ServerPoster4 : MonoBehaviour
{
public GameObject Cage;
public GameObject Free;

 bool previousPoster4SwitchState;
 public dataPoster4 dts;
   DatabaseReference dbRef;


     public void Awake(){
    dbRef = FirebaseDatabase.DefaultInstance.RootReference;
   }

public void SaveDataFn()
{
    // Create a new dataPoster1 object with only the PosterIndex field
    dataPoster4 posterIndexData = new dataPoster4
    {
        PosterIndex = dts.PosterIndex
    };

    // Convert the posterIndexData object to JSON
    string json = JsonUtility.ToJson(posterIndexData);

    // Set the value of "PosterIndex" child node in the database
    dbRef.Child("PosterIndex").SetRawJsonValueAsync(json);

    Debug.Log("Text: ");
}

   public void Start(){
        dts.PosterIndex = 3;

   }


   public void Update(){
    if (Input.GetKeyDown("space"))
        {
            SaveDataFn();
        }
          if (Input.GetKeyDown("up"))
        {
            LoadDataFn();
        }

        LoadDataFn();
    dts.PosterIndex = 3;

    if (dts.Poster4Switch != previousPoster4SwitchState)
    {
        previousPoster4SwitchState = dts.Poster4Switch;

        if (dts.Poster4Switch)
        {
            Cage.SetActive(false);
            Free.SetActive(true);
        }
        else
        {
            Cage.SetActive(true);
            Free.SetActive(false);
        }
    }

        SaveDataFn();

    
   }

    public void LoadDataFn()
    {
        StartCoroutine(LoadDataEnum());
    }


    IEnumerator LoadDataEnum() 
    {
        var serverData = dbRef.GetValueAsync();
        yield return new WaitUntil(predicate: () => serverData.IsCompleted);

        print("process is complete");

        DataSnapshot snapshot = serverData.Result;
        string jsonData = snapshot.GetRawJsonValue();

        if (jsonData != null)
        {
            print("server data found");

            dts = JsonUtility.FromJson<dataPoster4>(jsonData);
        }
        else {
            print("no data found");
        }

    }



}