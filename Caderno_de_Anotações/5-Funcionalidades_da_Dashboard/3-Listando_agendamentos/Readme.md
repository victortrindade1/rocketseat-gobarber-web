# Listando agendamentos

<!-- TOC -->

- [Listando agendamentos](#listando-agendamentos)
  - [src/pages/Dashboard/index.js](#srcpagesdashboardindexjs)

<!-- /TOC -->

## src/pages/Dashboard/index.js

A data está sendo salva no banco sem considerar a time zone. Ou seja, a data no
banco é 3 horas a mais do q no Brasil. A data pega no `new Date()` já está com
time zone, então eu vou ter q converter pro time zone global. Pra isso, vou usar
a lib `date-fns-tz`.

`yarn add date-fns-tz`

```diff
-import React, { useState, useMemo } from 'react';
+import React, { useState, useMemo, useEffect } from 'react';
-import { format, subDays, addDays } from 'date-fns';
+import {
+  format,
+  subDays,
+  addDays,
+  setHours,
+  setMinutes,
+  setSeconds,
+  isBefore,
+  isEqual,
+  parseISO,
+} from 'date-fns';
+import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

+const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
+ const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

+  useEffect(() => {
+    async function loadSchedule() {
+      const response = await api.get('schedule', {
+        params: { date },
+      });
+
+      // Pega timezone do usuário
+      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
+
+      const data = range.map((hour) => {
+        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
+        const compareDate = utcToZonedTime(checkDate, timezone);
+
+        return {
+          time: `${hour}:00h`,
+          past: isBefore(compareDate, new Date()),
+          appointment: response.data.find((a) =>
+            isEqual(parseISO(a.date), compareDate)
+          ),
+        };
+      });
+      setSchedule(data);
+    }
+
+    loadSchedule();
+  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
-       <Time past>
-         <strong>08:00</strong>
-         <span>Victor Trindade</span>
-       </Time>
-       <Time available>
-         <strong>09:00</strong>
-         <span>Em aberto</span>
-       </Time>
-       <Time>
-         <strong>10:00</strong>
-         <span>Victor Trindade</span>
-       </Time>
-       <Time>
-         <strong>11:00</strong>
-         <span>Victor Trindade</span>
-       </Time>
+       {schedule.map((time) => (
+         <Time key={time.time} past={time.past} available={!time.appointment}>
+           <strong>{time.time}</strong>
+           <span>
+             {time.appointment ? time.appointment.user.name : 'Em aberto'}
+           </span>
+         </Time>
+       ))}
      </ul>
    </Container>
  );
}
```
