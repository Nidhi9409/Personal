import * as React from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = React.useState("");
  const [records, setRecords] = React.useState({});

  const vowelsfreq = (name) => {
    const count = name.match(/[aeiou]/gi)?.length || 0;
    return count;
  };
  const highlightVowels = (name) => {
    return name.split("").map((char, index) => (
      <span key={index} style={/[aeiou]/i.test(char) ? { color: "red" } : {}}>
        {char}
      </span>
    ));
  };

  const handleSubmit = () => {
    setName("");
    const vFreq = vowelsfreq(name);

    const existingRecord = records[vFreq];

    if (existingRecord) {
      const updatedRecords = {
        ...records,
        [vFreq]: {
          ...existingRecord,
          names: [...existingRecord.names, { name, length: name.length }]
        }
      };

      setRecords(updatedRecords);
    } else {
      const newRecord = {
        names: [{ name, length: name.length }]
      };

      setRecords({ ...records, [vFreq]: newRecord });
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Vowels Activity</h1>
      </div>
      <div>
        <label>Names:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Enter Your Names"
        />
        <button id="myBtn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Vowels Frequency</th>
              <th>Names</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(records).map(([vFreq, record]) => (
              <tr key={vFreq}>
                <td>{vFreq}</td>
                <td>
                  {record.names.map(({ name, length }) => (
                    <div key={name}>
                      {highlightVowels(name)} ({length})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
