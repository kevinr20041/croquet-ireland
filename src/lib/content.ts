export const HISTORY_TEXT = `Few people realise the strength of the influence of Ireland on croquet during the early nineteenth century. Ask most people how they think croquet came to Ireland, and they would probably guess it arrived with the Regiments and was played in the stately homes of the Ascendancy. In fact, the reverse is true: the game was developed in Ireland well before it reached England.

The Field of 1858 records "meetings of the County Meath Croquet Cracks" — young players who met at each other's houses. That year, one of them, George Annesley Pollok of Oatlands and Newcastle, Co Meath, sent out a copy of his rules under the pseudonym "Corncrake," calling them "The Rules of the Oatlands Club" — the first recorded mention of a croquet club anywhere.

The noted croquet historian Dr Prior wrote in 1872: "One thing only is certain: it is from Ireland that croquet came to England." Records also show the game was played at Greenmount near Castlebellingham, Co Louth, around 1834, and at the Bishop of Tuam's palace and Castlehacket, Co Galway. A report from 1864 states that in 1834/35 the game was played in Kingstown (now Dún Laoghaire) "under the name of Croquet, with implements similar to those now used" — meaning croquet was played in Ireland for almost twenty years before it reached England.

The first Irish Croquet Championship is recorded from 1871. The oldest surviving club in Ireland is Rushbrooke Lawn Tennis and Croquet Club, founded in 1882. The Irish Championships were resurrected in 1900, rotating between Belfast, Cork and Fitzwilliam LTC in Dublin — Athenry could once field 12 courts for its tournament. Carrickmines Croquet and Lawn Tennis Club became the permanent home of the Championship in 1909, and remains the sport's principal home in Ireland today.

Irish players of the era — Cyril and Herbert Corbally, C.L. O'Callaghan, Nina Coote and Peter Duff Mathews among them — dominated both at home and in England, introducing what became known as the "Irish style" of grip and swing.

Sources: Clive Martin & Simon Williams, "A History of Croquet in Ireland" (2004).`;

export const GETTING_STARTED_TEXT = `There are several ways to begin playing croquet.

The simplest is to buy a set of croquet equipment and set up in your back garden — knock a ball around and run it through hoops just for fun. You need a reasonably large, flat area of short-cut lawn — think closer to a putting green than a rough fairway, though a decent lawn will get you started. The CAI also has a croquet set available for free loan if you'd like to try before you buy.

A full-sized lawn is 35 x 28 yards, with extra space around the edges for boundary play — many privately owned lawns are smaller than this.

There are two main forms of the game played competitively in Ireland:

Golf Croquet is the simplest form, and probably the easiest to get started with. Each player takes a single shot in turn, so everyone stays fully involved — it's very family-friendly, but is also played seriously right up to World Championship level (the 2007 Ladies World Championship was held at Carrickmines). If croquet ever became an Olympic sport, it would likely be in this form.

Association Croquet is a more formal version of garden croquet. A player earns extra shots after running a hoop and after striking another ball, meaning a skilled player can potentially play through all the hoops to the peg while their opponent simply watches — it rewards tactics and break-building.

Whichever form appeals, it's worth visiting a croquet club — every CAI-affiliated club welcomes prospective new members and visitors. See the club directory to find one near you.`;

export type ChampionshipTable = { title: string; results: [string, string][] };

export const CHAMPIONSHIP_WINNERS: ChampionshipTable[] = [
  {
    title: "Singles Championship of Ireland",
    results: [
      ["2025", "D. Maugham (England)"], ["2024", "A. Johnston"], ["2023", "D. Johnston"], ["2022", "D. Johnston"],
      ["2021", "A. Johnston"], ["2020", "D. Johnston"], ["2019", "A. Johnston"], ["2018", "S. Williams"],
      ["2017", "A. Johnston"], ["2016", "S. Williams"], ["2015", "A. Johnston"], ["2014", "D. Johnston"],
      ["2013", "D. Johnston"], ["2012", "A. Johnston"], ["2011", "B. Rothman (USA)"], ["2010", "B. Rothman (USA)"],
      ["2009", "Stephen Mulliner"], ["2008", "S. Williams"], ["2007", "Stephen Mulliner (UK)"], ["2006", "M. J. McInerney"],
      ["2005", "R.N. McInerney"], ["2004", "M. J. McInerney"], ["2003", "S. Williams"], ["2002", "R.N. McInerney"],
      ["2001", "S. Williams"], ["2000", "A.E. Cunningham"], ["1999", "M. Burrow (Jersey)"], ["1998", "S. Williams"],
      ["1997", "R.N. McInerney"], ["1996", "R.N. McInerney"], ["1995", "A.E. Cunningham"], ["1994", "G. Noble (Eng)"],
      ["1993", "A.J. Westerby (NZ)"], ["1992", "F.J. Rogerson"], ["1991", "Lewis Palmer (Wal)"], ["1990", "J.E. Guest (Eng)"],
      ["1989", "C.M. von Schmieder"], ["1988", "S. Williams"], ["1987", "F.J. Rogerson"], ["1986", "G.P.N. Healy"],
      ["1985", "T.O. Read"], ["1984", "G.P.N. Healy"], ["1983", "C.M. von Schmieder"], ["1982", "T.O. Read"],
      ["1981", "R.J. Murfitt (NZ)"], ["1980", "T.O. Read"], ["1979", "T.O. Read"], ["1978", "T.O. Read"],
      ["1977", "T.O. Read"], ["1976", "T.O. Read"], ["1975", "T.O. Read"], ["1974", "T.O. Read"],
      ["1973", "T.O. Read"], ["1972", "T.O. Read"], ["1971", "D.B. O'Connor"], ["1970", "Mrs J. Jarden (NZ)"],
      ["1969", "D.B. O'Connor"], ["1968", "D.B. O'Connor"], ["1967", "D.F. Strachen"], ["1966", "D.F. Strachen"],
      ["1965", "D.F. Strachen"], ["1964", "D.F. Strachen"], ["1963", "D.F. Strachen"], ["1962", "Capt H.G. Stoker"],
      ["1961", "R.J. Leonard"], ["1960", "Lady Fitzgerald"], ["1959", "Mrs E. Leonard"], ["1958", "Mrs K.E. Longman"],
      ["1957", "Cmdr W.S. Beamish"], ["1956", "P. Duff Mathews & W. Kirk (NZ) (divided)"], ["1955", "Col. W.S. Beamish"],
      ["1954", "P. Duff Mathews"], ["1953", "P. Duff Mathews"], ["1952", "P. Duff Mathews"], ["1951", "G.M. Fitzpatrick"],
      ["1950", "G.M. Fitzpatrick"], ["1949", "P. Duff Mathews"], ["1948", "P. Duff Mathews (won trophy outright)"],
      ["1947", "P. Duff Mathews"], ["1946", "G.M. Fitzpatrick"], ["1945", "P. Duff Mathews"], ["1944", "P. Duff Mathews"],
      ["1943", "P. Duff Mathews"], ["1942", "Mrs W.R. Fitzgerald"], ["1941", "B.T. O'Reilly"], ["1940", "Mrs W.R. Fitzgerald"],
      ["1939", "P. Duff Mathews"], ["1938", "D. Hopkins"], ["1937", "J.C. Windsor (Aus)"], ["1926", "H. Corbally (outright winner)"],
      ["1925", "H. Corbally"], ["1924", "H. Corbally"], ["1923", "H. Corbally"], ["1922", "W.F. Pim"],
      ["1921", "R. Willington"], ["1920", "J.A. McMordie"], ["1919", "J.A. McMordie"], ["1914", "W.F. Pim"],
      ["1913", "H. Corbally"], ["1912", "R.C.J. Beaton"], ["1911", "C. Corbally"], ["1910", "R.C.J. Beaton"],
      ["1909", "R.C.J. Beaton"], ["1908", "R.C.J. Beaton"], ["1907", "Talbot J. Considine"], ["1906", "C. Corbally"],
      ["1905", "H. Corbally"], ["1904", "R.C.J. Beaton"], ["1903", "C. Corbally"], ["1902", "R.N. Roper"],
      ["1901", "C. Corbally"], ["1900", "R.N. Roper"],
    ],
  },
  {
    title: "Doubles Championship of Ireland",
    results: [
      ["2025", "A. Johnston & R. Harris"], ["2024", "A. Johnston & D. Johnston"], ["2023", "A. Johnston & D. Johnston"],
      ["2022", "A. Johnston & D. Johnston"], ["2021", "A. Johnston & D. Johnston"], ["2020", "A. Johnston & D. Johnston"],
      ["2019", "A. Maugham & D. Maugham (UK)"], ["2018", "N. Healy & D. Johnston"], ["2017", "A. Johnston & D. Johnston"],
      ["2016", "J. Clingan & S. Williams"], ["2015", "A. Johnston & D. Johnston"], ["2014", "D. Bent (USA) & A. Johnston"],
      ["2013", "D. Bent (USA) & A. Johnston"], ["2012", "D. Johnston & K. Murphy"], ["2011", "M. McInerney & S. Williams"],
      ["2010", "A. Johnston & C. Broderick"], ["2009", "Andrew Johnston & Conor Broderick"], ["2008", "S. Williams & P. Fitzgerald"],
      ["2007", "Stephen Mulliner & Will Gee (UK)"], ["2006", "R.N. & M.J. McInerney"], ["2005", "R.N. & A.E. McInerney"],
      ["2004", "D. Bulloch (NZ) & A. Hobbs (RSA)"], ["2003", "R.N. & A.E. McInerney"], ["2002", "P. Fitzgerald & A. Johnston"],
      ["2001", "M. Burrow (Jer) & M.J. McInerney"], ["2000", "S. Burrow (Jer) & S. Mulliner (Eng)"],
      ["1999", "E.G.-B. Newell & R. Rogerson"], ["1998", "M. O'Connell (Sco) & S. Williams"],
      ["1997", "R.N. McInerney & M.E. O'Shaughnessy"], ["1996", "M. O'Connell (Sco) & S. Williams"],
      ["1995", "A.E. Cunningham & S. Williams"], ["1994", "G. Noble & A. Palmer (Eng)"],
      ["1993", "A.E. Cunningham & S. Williams"], ["1992", "A.E. Cunningham & S. Williams"],
      ["1991", "P. Eardley (Eng) & J.E. Guest (Eng)"], ["1990", "M.E. O'Shaughnessy & S. Williams"],
    ],
  },
  {
    title: "CAI Silver Medal",
    results: [
      ["2026", "Simon Williams"], ["2009", "Andrew Johnston"], ["2008", "E. Cunningham"], ["2007", "E. Cunningham"],
      ["2006", "M. J McInerney"], ["2005", "E. Cunningham"], ["2004", "M. J McInerney"], ["2003", "E. Cunningham"],
      ["2002", "R.N. McInerney"], ["2001", "M.J. McInerney"], ["2000", "E. Cunningham"], ["1999", "S. Williams"],
      ["1998", "J.I.A. Shorten"], ["1997", "S. Williams"], ["1996", "no competition"], ["1995", "C.S. (Charlie) von Schmieder"],
      ["1994", "F.J. Rogerson"], ["1993", "no competition"], ["1992", "F.J. Rogerson, M.A. Saurin & S. Williams (tied)"],
      ["1991", "no competition"], ["1990", "C.M. von Schmieder & S. Williams (tied)"], ["1989", "no competition"],
      ["1988", "C.M. von Schmieder"], ["1987", "C.J. Irwin"],
    ],
  },
  {
    title: "Irish Golf Croquet Championships",
    results: [
      ["2023", "—"], ["2022", "S. Williams"], ["2021", "M. Stephens"], ["2020", "P.D. Fitzgerald"],
      ["2019", "P.D. Fitzgerald"], ["2018", "H. Dodge"], ["2017", "P.D. Fitzgerald"], ["2016", "J. Clingan"],
      ["2015", "J. Clingan"], ["2014", "S. Williams"], ["2013", "P.D. Fitzgerald"], ["2012", "P.D. Fitzgerald"],
      ["2011", "A.E. Cunningham"], ["2010", "A.E. Cunningham"], ["2009", "S. Williams"], ["2008", "P. Fitzgerald"],
      ["2007", "P. Fitzgerald"], ["2006", "P. Fitzgerald"], ["2005", "S. Williams"], ["2004", "Moore (Eng.)"],
      ["2003", "M.J. McInerney"], ["2002", "A. Johnston"], ["2001", "A.E. Cunningham"], ["2000", "E.G.-B. Newell"],
      ["1999", "R. Rogerson"], ["1998", "M.J. McInerney"], ["1997", "S. Williams"],
    ],
  },
  {
    title: "Championships of County Dublin",
    results: [
      ["2026", "Simon Williams (see full report)"], ["2023", "S. Williams"], ["2022", "D. Johnston"], ["2021", "D. Johnston"],
      ["2020", "Not Played"], ["2019", "S. Williams"], ["2018", "S. Williams"], ["2017", "S. Williams"],
      ["2016", "D. Johnston"], ["2015", "S. Williams"], ["2014", "D. Johnston"], ["2013", "D. Johnston"],
      ["2012", "S. Williams"], ["2011", "M. McInerney"], ["2010", "S. Williams"], ["2009", "Ed Cunningham"],
      ["2008", "S. Williams"], ["2007", "G. Healy"], ["2006", "S. Williams"], ["2005", "A.E. Cunningham"],
      ["2004", "A. Johnston"], ["2003", "R.N. McInerney"], ["2002", "M. Suter"], ["2001", "A.E. Cunningham"],
      ["2000", "A.E. Cunningham"], ["1999", "E. Newall"], ["1998", "A.E. McInerney"], ["1997", "A.E. Cunningham"],
      ["1996", "R.N. McInerney"], ["1995", "R.N. McInerney"], ["1994", "A.E. Cunningham"], ["1993", "R.N. McInerney"],
      ["1992", "S. Williams"],
    ],
  },
  {
    title: "South Leinster Open Championship",
    results: [
      ["2023", "D. Maugham"], ["2022", "R. Harris"], ["2021", "A. Johnston"], ["2020", "Not Held"], ["2019", "Not Held"],
      ["2018", "Not Held"], ["2017", "S. Williams"], ["2016", "E. Newell"], ["2015", "Not Held"], ["2014", "Not Held"],
      ["2013", "Not Held"], ["2012", "A. Johnston"], ["2011", "S. Williams"], ["2010", "Not Held"], ["2009", "Not Held"],
      ["2008", "G.P.N. Healy"], ["2007", "A. Johnston"], ["2006", "M. McInerney"], ["2005", "R.N. McInerney"],
      ["2004", "A. Johnston"], ["2003", "M. Suter"], ["2002", "R.N. McInerney"],
    ],
  },
];

export const INTERNATIONAL_RESULTS_SECTIONS = [
  {
    title: "Ireland v Great Britain — Home Internationals (Ireland, England, Scotland, Wales)",
    lines: [
      "2006 GB 9 Ireland 6 — won by England, Ireland 3rd", "2005 Ireland 8.5 GB 6.5 — won by England, Ireland 2nd",
      "2004 G.B. 13 : Ireland 2 — won by England, Ireland 2nd", "2003 Ireland 5 : G.B. 10 — won by England, Ireland 3rd",
      "2002 — won by England, Ireland 2nd", "2001 G.B. 9 : Ireland 0 — won by Ireland",
      "2000 Ireland 4 : Gt Britain 5 — won by England, Ireland 2nd", "1999 — won by Ireland",
      "1998 — won by England, Ireland 3rd", "1997 — won by England, Ireland 3rd", "1996 — won by England, Ireland 3rd",
      "1995 — won by England, Ireland 4th", "1994 — won by England, Ireland 2nd", "1993 — won by England, Ireland 2nd",
      "1992 — won by England, Ireland 4th", "1991 — won by England, Ireland 3rd", "1990 — won by England, Ireland 2nd",
      "1989 — won by England, Ireland 2nd", "1988 — won by Ireland", "1987 — won by England, Ireland 3rd",
      "1986 — won by England, Ireland 2nd", "1985 — won by England, Ireland 4th", "1984 — won by England, Ireland 4th",
      "1983 — won by England, Ireland 2nd", "1982 — won by England, Ireland 2nd", "1981 — won by Scotland, Ireland 4th",
    ],
  },
  {
    title: "Ireland v USA — Carter Challenge Trophy",
    lines: [
      "2006 Ireland 13 : USA 8", "2001 U.S.A. 10 : Ireland 11", "1999 Ireland 20½ : U.S.A. 5½",
      "1997 Ireland 15 : U.S.A. 12", "1995 U.S.A. 10 : Ireland 8",
    ],
  },
  {
    title: "Ireland v South Africa — Maureen Bamford Trophy",
    lines: ["2000 Ireland 13 : S Africa 8", "1998 S Africa 15 : Ireland 7"],
  },
  {
    title: "Ireland v Jersey",
    lines: [
      "2005 Ireland 18 : Jersey 15", "2000 Ireland 12 : Jersey 0", "1999 Jersey 2 : Ireland 4",
      "1998 Ireland 13 : Jersey 7", "1997 Jersey 19 : Ireland 11", "1996 Jersey 5 : Ireland 4",
    ],
  },
  {
    title: "Ireland v Wales",
    lines: ["2000 Ireland 6.5 : Wales 3.5"],
  },
  {
    title: "Ireland v France",
    lines: [
      "1994 France 10 : Ireland 6", "1993 Ireland 3 : France 3 (winners)", "1992 France 12 : Ireland 8",
      "1991 Ireland 14 : France 3", "1990 France 2 : Ireland 1",
    ],
  },
  {
    title: "Ireland v Switzerland",
    lines: [
      "2000 Ireland 'B' 6 : Switzerland 6", "1995 Ireland 12 : Switzerland 8", "1994 Switzerland 8 : Ireland 12",
      "1993 Ireland 19 : Switzerland 1", "1992 Switzerland 8 : Ireland 4", "1991 Ireland 6 : Switzerland 6 (winners)",
    ],
  },
  {
    title: "Ireland \"B\" Internationals",
    lines: [
      "2000 Ireland 12 : Wales B 8", "1999 Ireland B 13 : Belgium B 5", "1999 Ireland B 10 : Scotland 8",
      "1998 Belgium B 6 : Ireland B 12", "1998 Scotland B 7 : Ireland B 13", "1997 Ireland B 14 : Scotland B 5",
    ],
  },
  {
    title: "Junior Internationals (under 18)",
    lines: ["1990 England 8 : Ireland 2"],
  },
  {
    title: "Other International Matches",
    lines: [
      "1996 Ireland 1 : Australia 8", "1990 Ireland 14 : U.S.A. 22", "1986 Ireland 2 : Australia 7",
      "1985 U.S.A. 14 : Ireland 16", "1985 Ireland 13 : U.S.A. 11", "1979 Ireland 1 : Australia 8",
      "1974 Ireland 0 : Australia 9", "1958 Ireland 6 : England 6", "1939 Ireland 3 : England 3",
      "1937 Ireland 2 : Australia 4", "1902 England 5 : Ireland 3",
    ],
  },
  {
    title: "Vera McWeeney Trophy (CAI v English CA)",
    lines: [
      "2005 won by England, Surbiton", "2004 won by England, Carrickmines", "2003 won by Ireland, Bristol",
      "2002 won by Ireland, Carrickmines", "2001 won by England, Southport", "2000 won by Ireland, Carrickmines",
      "1999 won by Ireland, Cheltenham", "1998 won by England, Carrickmines", "1997 won by Ireland, Southport",
      "1996 won by England, Carrickmines", "1995 won by Ireland, Southport", "1994 won by Ireland, Carrickmines",
      "1993 won by England, Cheltenham", "1992 won by England, Carrickmines", "1991 won by England, Southport",
      "1990 won by Ireland, Carrickmines", "1989 won by Ireland, Surbiton", "1988 won by Ireland, Carrickmines",
      "1987 won by England, Southport", "1986 won by England, Carrickmines", "1985 won by England, Cheltenham",
      "1984 won by Ireland, Carrickmines", "1983 won by England, Bowdon", "1982 won by Ireland, Carrickmines",
      "1981 won by England", "1980 won by Ireland, Carrickmines",
    ],
  },
  {
    title: "Appleton Trophy (CAI v Scottish CA)",
    lines: [
      "2026 lost at Edinburgh, 9-16", "2006 won by Ireland, Edinburgh", "2005 won by Ireland, Carrickmines",
      "2004 won by Ireland, Edinburgh", "2003 won by Scotland, Carrickmines", "2002 won by Scotland, Glasgow",
      "2001 won by Scotland, Carrickmines", "2000 won by Scotland, Glasgow", "1999 won by Ireland, Carrickmines",
      "1998 won by Ireland, Glasgow", "1997 won by Ireland, Carrickmines", "1996 won by Scotland, Glasgow",
      "1995 won by Ireland, Carrickmines", "1994 won by Scotland, Glasgow", "1993 won by Ireland, Carrickmines",
      "1992 won by Scotland, Glasgow", "1991 won by Ireland, Carrickmines", "1990 won by Scotland, Glasgow",
      "1989 won by Scotland, Carrickmines", "1988 won by Scotland, Glasgow", "1987 won by Ireland, Carrickmines",
      "1986 won by England, Carrickmines", "1985 won by England, Cheltenham", "1984 won by Ireland, Carrickmines",
      "1983 won by England, Bowdon", "1982 won by Ireland, Carrickmines", "1981 won by England",
      "1980 won by Ireland, Carrickmines",
    ],
  },
];

export const EXTERNAL_LINKS = [
  { label: "The Croquet Association (England) — official rules", href: "https://www.croquet.org.uk/" },
  { label: "Oxford Croquet — coaching notes and tactics", href: "http://www.oxfordcroquet.com/" },
  { label: "World Croquet Federation", href: "https://worldcroquet.org/" },
  { label: "World Croquet Online Magazine", href: "https://www.croquetworld.com/" },
  { label: "European Croquet Federation — European Masters", href: "https://johnswabey.wix.com/european-masters" },
  { label: "Scottish Croquet Association", href: "https://www.scottishcroquet.org.uk/" },
  { label: "CroquetScores — latest scores from Ireland and around the world", href: "https://www.croquetscores.com/" },
  { label: "Carrickmines Croquet & Lawn Tennis Club", href: "https://www.carrickmines.com/" },
];
