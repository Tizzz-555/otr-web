import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface IMostPlayedModsCardProps {
  countHR: number;
  countDT: number;
  countHD: number;
}

function MostPlayedModsCard({
  countHR,
  countDT,
  countHD,
}: IMostPlayedModsCardProps) {
  const sum = countHR + countDT + countHD;
  let hrPercentage = Math.round((countHR / sum) * 100);
  let dtPercentage = Math.round((countDT / sum) * 100);
  let hdPercentage = Math.round((countHD / sum) * 100);

  if(sum === 0) {
    hrPercentage = 0;
    dtPercentage = 0;
    hdPercentage = 0;
  }

  const data = [
    { name: "HR", value: sum > 0 ? countHR : 1, percentage: hrPercentage, color: "#E37575" },
    { name: "DT", value: sum > 0 ? countDT : 1, percentage: dtPercentage, color: "#4D94FF" },
    { name: "HD", value: sum > 0 ? countHD : 1, percentage: hdPercentage, color: "#E3DE76" },
  ];

  data.sort((a, b) => b.value - a.value);

  return (
    <div className="bg-gray-100 rounded-xl md:w-1/2 lg:w-1/3 mx-3 px-8 py-5">
      <div className="flex flex-col w-full">
        <h1 className="font-sans text-4xl font-semibold">Most played mods</h1>
      </div>
      <div className="flex">
        <div className="flex font-sans h-36 w-1/2">
          <ResponsiveContainer className={"inline-flex"}>
            <PieChart>
              <Pie
                data={data}
                cx={80}
                cy={80}
                innerRadius={45}
                outerRadius={60}
                paddingAngle={2}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={data[index].color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-7/12 mx-auto mt-5">
          <div className="flex-col">
            {data.map((entry, index) => (
              <div className="flex flex-row space-x-2 pb-1">
                <p className="flex font-sans text-lg mx-auto w-full justify-end">{data[index].percentage < 1 ? '<1' : data[index].percentage}%</p>
                <p className="flex font-sans text-lg font-semibold w-full justify-start" style={{color: data[index].color}}>{data[index].name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostPlayedModsCard;
