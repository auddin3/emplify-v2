export const calculateDateDifference = (deadline: string | Date): number => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    
    if (isNaN(deadlineDate.getTime())) {
      throw new Error("Invalid date");
    }
    
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 1000 ms * 3600 sec * 24 hours
    
    return daysRemaining;
}

export const dummyKSBs = [
  {
    title: 'D1',
    subtitle: 'Data Analytics',
    description: 'Is able to work with big data analytics solutions to derive insights and conclusions',
    category: ['dataModelling'],
  },
  {
    title: 'C7',
    subtitle: 'Computer and Network Infrastructure',
    description: 'Can plan, design and manage computer networks with an overall focus on the services and capabilities that network infrastructure solutions enable in an organisational context. Identifies network security risks and their resolution.',
    category: [
      'networks',
    ],
  },
  {
    title: 'C1',
    subtitle: 'Information Systems',
    description: 'Is able to critically analyse a business domain in order to identify the role of information systems, highlight issues and identify opportunities for improvement through evaluating information systems in relation to their intended purpose and effectiveness',
    category: [
      'dataModelling',
    ],
  },
  {
    title: 'C2',
    subtitle: 'Systems Development',
    description: 'Analyses business and technical requirements to select and specify appropriate technology solutions. Designs, implements, tests, and debugs software to meet requirements using contemporary methods including agile development. Manages the development and assurance of software artefacts applying secure development practises to ensure system resilience. Configures and deploys solutions to end users.',
    category: [
      'softwareEngineering',
      'UXD/UID',
      'dataModelling',
    ],
  },
  {
    title: 'C3',
    subtitle: 'Data Modelling',
    description: 'Identifies organisational information requirements and can model data solutions using conceptual data modelling techniques. Is able to implement a database solution using an industry standard database management system (DBMS). Can perform database administration tasks and is cognisant of the key concepts of data quality and data security. Is able to manage data effectively and undertake data analysis.',
    category: [
      'dataModelling',
    ],
  },
  {
    title: 'C4',
    subtitle: 'Cyber Security',
    description: 'Can undertake a security risk assessment for a simple IT system and propose resolution advice. Can identify, analyse and evaluate security threats and hazards to planned and installed information systems or services (e.g. Cloud services).',
    category: [
      'networks',
      'artificialIntelligence',
    ],
  },
  {
    title: 'C5',
    subtitle: 'Business Organisation',
    description: 'Can apply organisational theory, change management, marketing, strategic practice, human resource management and IT service management to technology solutions development. Develops well-reasoned investment proposals and provides business insights.',
    category: [
      'dataModelling',
    ],
  },
  {
    title: 'C6',
    subtitle: 'IT Project Management',
    description: 'Follows a systematic methodology for initiating, planning, executing, controlling, and closing technology solutions projects. Applies industry standard processes, methods, techniques and tools to execute projects. Is able to manage a project (typically less than six months, no inter-dependency with other projects and no strategic impact) including identifying and resolving deviations and the management of problems and escalation processes.',
    category: [
      'softwareEngineering',
      'UXD/UID',
    ],
  },
  {
    title: 'D2',
    subtitle: 'Data Engineering',
    description: 'Is able to build infrastructure to support big data analytics solutions',
    category: [
      'dataModelling',
    ],
  },
]
  